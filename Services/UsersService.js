const Users = require("../Models/Users");

class UsersService {
    async all() {
        const all = await Users.find().limit(10).sort([['date', -1]]);
        return all;
    }

    async search(username) {
        const searchedUsers = await Users.find({username: {$regex: '.*' + username + '.*'}}).limit(10);
        return searchedUsers;
    }
}

module.exports = new UsersService();