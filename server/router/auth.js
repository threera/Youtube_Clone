import express from "express"
import { googleAuth, signin, signup } from "../controllers/auth.js"


//เส้นทางการทำงานในการ login & register
const router = express.Router();

//create user
router.post('/singup', signup)

//sign in user
router.post('/singin', signin)

//google register & login auth
router.post('/google', googleAuth)

export default router;