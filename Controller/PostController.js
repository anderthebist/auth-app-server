const PostsService = require("../Services/PostsService");
const {validationResult} = require('express-validator');
const ApiError = require("../Exeptions/ApiError");

class PostController {
    async getPosts(req,res,next) {
        try {
            const posts = await PostsService.get(req.params.userId);
            res.json(posts);
        } catch(e) {
            next(e);
        }
    }

    async create(req,res,next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                throw ApiError.BadRequest(errors.errors[0].msg);

            const newPost = await PostsService.create(req.user.id,req.body.text);
            res.json(newPost);
        } catch(e) {
            next(e);
        }
    }

    async delete(req,res,next) {
        try {
            const deletePost = await PostsService.delete(req.params.postId, req.user.id);
            res.json(deletePost);
        } catch(e) {
            next(e);
        }
    }

    async update(req,res,next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                throw ApiError.BadRequest(errors.errors[0].msg);

            const updated = await PostsService.update(req.user.id, req.body);
            res.json(updated);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new PostController();