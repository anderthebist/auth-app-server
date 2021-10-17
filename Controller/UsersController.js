const UsersService = require("../Services/UsersService");
const ApiError = require("../Exeptions/ApiError");

class UsersController {
    async search(req, res, next) {
        try {
            const username = req.params.username;
            if(!username) {
                throw ApiError.BadRequest("Username is undefined");
            }
            const users = await UsersService.search(username);
            res.json(users);
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
}

module.exports = new UsersController();