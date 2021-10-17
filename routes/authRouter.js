const Router = require("express").Router;
const AuthController = require("../Controller/AuthController");
const auth = require("../Middlware/auth");
const {body} = require('express-validator');

const authRouter = new Router();

authRouter.post("/registration",[
    body("username").notEmpty().withMessage("User empty").trim().isLength({ min: 4,max: 12 }).withMessage("User max 12 min 4"),
    body("email").notEmpty().withMessage("Email empty").isEmail().withMessage("Email is non valid"),
    body("password").notEmpty().withMessage("Password empty").trim().isLength({ min: 5,max: 16 }).withMessage("User max 16 min 8"),
], AuthController.registration);
authRouter.post("/login",[
    body("email").notEmpty().withMessage("Email empty").isEmail().withMessage("Email is non valid"),
    body("password").notEmpty().withMessage("Password empty"),
], AuthController.login);
authRouter.post("/fileupload", auth, AuthController.uploadImage);
authRouter.post("/logout", AuthController.logout);
authRouter.get("/activate/:link",AuthController.activate);
authRouter.get("/refrash",AuthController.refrash);

module.exports = authRouter;