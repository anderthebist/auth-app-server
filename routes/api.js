const Router = require('express').Router;
const PostController = require("../Controller/PostController");
const UsersController = require("../Controller/UsersController");
const {body} = require('express-validator');
const auth = require("../Middlware/auth");

const router = new Router();

router.get("/posts/:userId", auth, PostController.getPosts);
router.post("/posts/create", auth,[
    body("text").trim().notEmpty().withMessage("Введите текст")
], PostController.create);
router.delete("/posts/:postId", auth, PostController.delete);
router.put("/posts", auth,[
    body("text").trim().notEmpty().withMessage("Введите текст"),
    body("postId").trim().notEmpty().withMessage("Неизвесний пост")
], PostController.update);

router.get("/users/search/:username", UsersController.search);
router.get("/users", UsersController.getUsers);

module.exports = router;