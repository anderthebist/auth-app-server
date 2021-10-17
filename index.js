require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/api");
const authRouter = require("./routes/authRouter");
const fileUpload = require("express-fileupload");
const errorHandler = require("./Middlware/error-handler");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.static('images'));
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(fileUpload({}));
app.use(cookieParser());
app.use("/api",router);
app.use("/api/auth",authRouter);

app.use(errorHandler);

const start = async () => {
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => console.log(`Server start on ${PORT}`));
    } catch(e) {
        console.log(e);
    }
}

start();