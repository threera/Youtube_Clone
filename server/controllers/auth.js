import mongoose from "mongoose";
import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


//fuction register user 
export const signup = async (req, res, next) => {
    try {

        //ทำการเข้ารหัสของรหัสผ่าน โดยใช้  bcrypt
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash })

        //บันทึก user
        await newUser.save();
        res.status(200).send("User has been created")
    } catch (error) {
        next(error)
    }
}

// login 
export const signin = async (req, res, next) => {
    try {
        //นำ user มาตรวจสอบว่ามี user ใน dataหรือไม่
        const user = await User.findOne({ name: req.body.name });
        if (!user) return next(createError(404, "User not found!"));
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

        //token 
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        
        //นำค่า มาวนเก็บไว้ในตัวเเปล others ยกเว้น password
        const { password, ...others } = user._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(others);
    } catch (err) {
        next(err);
    }
};


export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        //ถ้ามี user ใน datadase ให้สร้าง token
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(user._doc);
        } else {

            //ถ้าไม่มี ให้ สร้าง user พร้อม token
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT);
            res
                .cookie("access_token", token, {
                    httpOnly: true,
                })
                .status(200)
                .json(savedUser._doc);
        }

    } catch (err) {
        next(err)
    }
}