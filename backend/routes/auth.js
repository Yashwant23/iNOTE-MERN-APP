//Express
const express = require("express")
const { body, validationResult } = require('express-validator')
const router = express.Router()

//Bcrypt
const bcryptjs = require('bcryptjs')

require("dotenv").config()
//JSONWEBTOKEN
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

//Middleware
const decodeToken = require('../middleware/decodeToken')

//Model Schema
const User = require('../models/User')



//CreateUser ROUTE
router.post('/createuser', [
    //Validation Check
    body("name", "Invalid Name").isLength({ min: 5 }),
    body("password", "Invalid Password").isLength({ min: 5 }),
    body("email", "Invalid Email").isEmail({ min: 5 })
],

    async (req, res) => {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            // console.log(req.body)
            return res.status(402).json(error)
        }

        //Hashing
        const salt = await bcryptjs.genSalt(5)
        const secPass = await bcryptjs.hash(req.body.password, salt)


        //Saving user 

        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                //  console.log(user)
                return res.status(400).json({ sucess: false, "error": "Email in already exists" })
            }


            user = new User(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: secPass
                })
            await user.save()


            //Token Generation
            const payload = {
                User: { id: user.id }
            }

            const authtoken = jwt.sign(payload, JWT_SECRET)
            res.json({ sucess: true, authtoken })


        } catch (err) {
            return res.status(500).json({ sucess: false, err })
        }
    })

//Login ROUTE

router.post('/login', [
    //Validation Check
    body("password", "Invalid Password").exists(),
    body("email", "Invalid Email").isEmail({ min: 5 })
],

    async (req, res) => {

        //Validation

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ sucess: false, error })
        }


        //Check for User in database
        try {

            let user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(400).json({ sucess: false, error: "Invalid credentials" })
            }
            const compPass = await bcryptjs.compare(req.body.password, user.password)
            if (!compPass) {
                return res.status(400).json({ sucess: false, error: "Invalid credentials" })
            }


            //Token Generation
            const payload = {
                User: { id: user.id }
            }
            const authtoken = jwt.sign(payload, JWT_SECRET)
            res.json({ sucess: true, authtoken })


        } catch (err) {
            return res.status(500).json({ sucess: false, err })
        }

    })

//GetUser ROUTE
router.post('/getuser',
    decodeToken, async (req, res) => {
        try {
            const userId = req.userId
            const user = await User.findById(userId).select("-password")
            return res.status(200).json({ sucess: true, user })
        } catch (error) {
            return res.status(500).json({ sucess: false, err })
        }
    })


module.exports = router