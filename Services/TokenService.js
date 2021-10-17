const jwt = require("jsonwebtoken");
const Token = require("../Models/Token");

class TokenService {
    generate(payload){
        const access = jwt.sign(payload, process.env.JWT_ACCESS_CODE, { expiresIn: "30m" });
        const refrash = jwt.sign(payload, process.env.JWT_REFRASH_CODE, { expiresIn: "30d" });

        return { access,refrash }
    }

    validate(token, code){
        try{
            const payload = jwt.verify(token, code);
            return payload;
        } catch(e) {
            return null;
        }   
    }

    async save(userId, refrashToken){
        const tokenCheck = await Token.findOne({user: userId});
        if(tokenCheck){
            tokenCheck.refrashToken = refrashToken;
            return tokenCheck.save();
        }

        const token = Token.create({user: userId,refrashToken});
        return token;  
    }

    async delete(refrashToken){
        const token = await Token.deleteOne({refrashToken});
        return token;
    }

    async find(data){
        const token = await Token.findOne(data);
        return token;
    }
}

module.exports = new TokenService();