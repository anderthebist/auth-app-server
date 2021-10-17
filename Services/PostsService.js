const Post = require("../Models/Post");
const ApiError = require("../Exeptions/ApiError");

class PostsService {
    async get(userId) {
        const posts = await Post.find({user: userId}).sort({date: 'desc'});
        return posts;
    }

    async create(userId,text) {
        const post = await Post.create({user: userId,text,date: new Date()});
        return post;
    }

    async delete(postId, userId) {
        const post = await Post.deleteOne({_id: postId, user:userId});
        return post;
    }

    async update(userId, {postId, text}) {
        const post = await Post.findOne({_id: postId, user:userId});
        if(!post) 
            throw ApiError.BadRequest("Пост не найден");
        
        post.text = text;
        await post.save();
        return post;
    }
}

module.exports = new PostsService();