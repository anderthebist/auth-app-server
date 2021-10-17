const Users = require("../Models/Users");
const Role = require("../Models/Role");
const MailService = require("./MailService");
const TokenDto = require("../Dtos/token_dto");
const TokenService = require("./TokenService");
const ImageService = require("./ImageService");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const ApiError = require("../Exeptions/ApiError");

class AuthService {
    async registration({email,username, password}) {
        const user = await Users.findOne({$or:[ { 'username':username }, { 'email':email } ]});

        if(user){
            throw ApiError.BadRequest("User there is");
        }
        const hashPasword = await bcrypt.hashSync(password,7);
        const role = await Role.findOne({value: "USER"});
        const activationLink = uuid.v4();

        const newUser = await Users.create({
            username,
            email,
            password: hashPasword,
            roles: role,
            date: new Date(),
            activationLink
        });

        await MailService.sendActivationUser(email, process.env.APP_URL+"/api/activate/"+activationLink);
        const tokens = await this.token(newUser);

        return {...tokens, user: newUser};
    }

    async auth({ email, password }){
        const user = await Users.findOne({ email });
        if(!user) 
            throw ApiError.BadRequest("Uncorrect email or password");

        const isPasswordValid = await bcrypt.compareSync(password, user.password);
        if(!isPasswordValid) throw ApiError.BadRequest("Uncorrect email or password");

        const tokens = await this.token(user);
        return {
            ...tokens,
            user
        }
    }

    async activate(link) {
        const user = await Users.findOne({activationLink: link});
        if(!user) throw ApiError.BadRequest("Link is bad");

        user.isActivated = true;
        const activated = await user.save();
        return activated;
    }

    async token(user){
        const userDto = new TokenDto(user);
        const tokens = TokenService.generate({...userDto});
        await TokenService.save(userDto.id,tokens.refrash);

        return tokens;
    }

    async logout(refrashToken) {
        const token = await TokenService.delete(refrashToken);

        return token;
    }

    async refrash(refrashToken){
        if(!refrashToken) throw ApiError.BadRequest("Undefined token");

        const tokenPayload = TokenService.validate(refrashToken, process.env.JWT_REFRASH_CODE);
        const checkToken = TokenService.find({refrashToken});

        if(!checkToken || !tokenPayload) throw ApiError.BadRequest("Undefined token");

        const user = await Users.findOne({_id: tokenPayload.id});
        const tokens = await this.token(user);

        return {...tokens, user};
    }

    async uploadImage(id,image) {
        if(!image)
            throw ApiError.BadRequest("Not uploaded file");
        
        const user = await Users.findById(id);
        if(!user)
            throw ApiError.BadRequest("User no found");
        ImageService.deleteFile(user.image);
        const filename = ImageService.saveFile(image);
        user.image = filename;
        const userUpdated = await user.save();
        return userUpdated;
    }
}

module.exports = new AuthService();