import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./router/users.js"
import videoRouter from "./router/video.js"
import commentRouter from "./router/comment.js"
import authRouter from "./router/auth.js"
import cookieParser from "cookie-parser";

const app = express()

dotenv.config()

//เชื่อมต่อ database mongoDB
const connect = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connect to DB")
    }).catch((err) => {
        throw err;
    })
}


app.use(cors())
app.use(express.json())
app.use(cookieParser())

//ประกาศการใช้ เส้นทางต่างๆ
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/videos', videoRouter)
app.use('/api/comments', commentRouter)


//ตรวจสอบ Error
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    connect()
    console.log("connect port 8000")
})