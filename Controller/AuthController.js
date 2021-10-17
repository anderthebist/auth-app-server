const AuthService = require("../Services/AuthService");
const {validationResult} = require('express-validator');
const ApiError = require("../Exeptions/ApiError");

class AuthController {
    async registration(req,res,next) {
        try{
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw ApiError.BadRequest(errors.errors[0].msg);
            }
            const data = await AuthService.registration(req.body);
            res.cookie("refrashToken", data.refrash, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true});

            return res.json(data);
        } catch(e) {
            next(e);
        }
    }

    async login(req,res,next) {
        try{
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw ApiError.BadRequest(errors.errors[0].msg);
            }

            const data = await AuthService.auth(req.body);
            res.cookie("refrashToken", data.refrash, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true});
            return res.json(data);
        } catch(e) {
            next(e);
        }
    }

    async logout(req,res,next) {
        try{
            const {refrashToken} = req.cookies;
            const token = await AuthService.logout(refrashToken);
            res.clearCookie('refrashToken');

            return res.json(token);
        } catch(e) {
            next(e);
        }
    }

    async activate(req,res,next) {
        try{
            const activateUser = await AuthService.activate(req.params.link);
            res.json(activateUser);
        } catch(e) {
            next(e);
        }
    }

    async refrash(req,res,next) {
        try{
            const {refrashToken} = req.cookies;
            const data = await AuthService.refrash(refrashToken);
            res.cookie("refrashToken", data.refrash, {maxAge: 30 * 24 * 60 * 60 *1000, httpOnly: true});

            res.json(data);
        } catch(e) {
            next(e);
        }
    }

    async getUsers(req,res,next) {
        try{
            const users = await UsersService.all();

            res.json(users);
        } catch(e) {
            next(e);
        }
    }

    async uploadImage(req,res,next) {
        try{
            const user = await AuthService.uploadImage(req.user.id,req.files.image);
            res.json(user);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new AuthController();