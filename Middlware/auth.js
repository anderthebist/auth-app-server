const TokenService = require("../Services/TokenService");
const ApiError = require("../Exeptions/ApiError");

const auth = async (req, res, next) => {
    try{
        const header = req.headers.authorization;
        if(!header) throw ApiError.UnauthorizeError();

        const token = header.split(" ")[1];
        const userData = TokenService.validate(token, process.env.JWT_ACCESS_CODE);
        if(!token || !userData) throw ApiError.UnauthorizeError();

        const tokenSelect = await TokenService.find({user: userData.id});
        if(!tokenSelect)  throw ApiError.UnauthorizeError();

        req.user = userData;
        next();
    } catch(e) {
        res.status(500).json(e.message);
        console.log(e);
    }
}

module.exports = auth;