const mongoose = require("mongoose");

const Users = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    image: {type: String, required: false, default: ""},
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    date: { type: Date, required: true },
    roles: [{type: String, ref: 'Role'}],
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String}
});

module.exports = mongoose.model("Users", Users);