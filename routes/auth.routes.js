import { Router } from "express";
import { check, validationResult } from "express-validator";
import config from "config"
import jwt from "jsonwebtoken";
import User from "../models/User.js"
import bcrypt from "bcryptjs"

const router = Router()

router.post(
    "/register",
    [
        check('email', "Email not correct").isEmail(),
        check('password', "Password min lenght 6 simbols").isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Not correct registration data"
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if(candidate){
                return res.status(400).json({message: "User is olredy exsist"})
            }

            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashPassword})

            await user.save()

            res.status(201).json({message: "User created"})

        }catch (e) {
            res.status(500).json({message: "Sever Error try later"})
        }
})

router.post(
    "/login",
    [
        check('email', "Email not correct").normalizeEmail().isEmail(),
        check('password', "Enter password").exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Not correct registration data"
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if(!user) {
                return res.status(400).json({message: "User not found"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message: "Email or password not correct"})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get("jwtSecret"),
                {expiresIn: "1h"}
            )

            res.json({ token, userId: user.id})

        }catch (e) {
            res.status(500).json({message: "Sever Error try later"})
        }
})

export default router