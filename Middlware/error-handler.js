const ApiError = require("../Exeptions/ApiError");

module.exports = (err, req,res,next) => {
    console.log(err);
    if(err instanceof ApiError) {
        res.status(err.status).json({message: err.message, errors: err.errors})
    }

    res.status(500).json({ message: "Ошибка сервера" });
}