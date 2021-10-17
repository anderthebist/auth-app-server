const mongoose = require("mongoose");

const Token = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    refrashToken: {type: String,requires: true}
});

module.exports = mongoose.model("Tokens",Token);