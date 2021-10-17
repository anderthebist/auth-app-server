const mongoose = require('mongoose');

const Post = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    text: { type: String, requires: true },
    date: { type: Date, requires: true }
});

module.exports = mongoose.model("Post", Post);