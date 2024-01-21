import user from "../models/user.js";
import express from "express"
import bcrypt from "bcrypt";
const route = express.Router()
const saltRounds = 10;
import jwt from 'jsonwebtoken';
const jtoken = "SHIVAMGUPTA"
import contect from "../models/contect.js";

route.post('/user', async (req, res) => {
    console.log(req.body, "not found") 
    const { name, email, mobile, password } = req.body
    if (name && email && mobile && password) {
        const emailvarify = await user.findOne({ email })
        if (emailvarify) {
            return res.status(400).json({ "message": "Email already exits" })
        }
        const mobilevarify = await user.findOne({ mobile })
        if (mobilevarify) {
            return res.status(400).json({ "message": "Mobile number already exits" })
        }
        try {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            const data = await user.create({ name, email, mobile, password: hash })
            const response = await data.save()
            const userId = {
                _id: {
                    id: response.id
                }
            }
            const authtoken = jwt.sign(userId, jtoken);
            res.json({ authtoken })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
    else {
        return res.status(400).json({ "message": "Fill all field" })
    }
})

route.post('/login', async (req, res) => {
    let val;
    let suceess = false;
    const { email, mobile, password } = req.body
    if ((email || mobile) && password) {
        const emailvarify = await user.findOne({ email })
        const mobilevarify = await user.findOne({ mobile })
        if (emailvarify) {
            val = emailvarify
        }
        else if (mobilevarify) {
            val = mobilevarify
        }
        else {
            return res.status(400).json({ "message": "value not exits" , suceess})
        }
        try {
            const response = bcrypt.compareSync(password, val.password)
            if (response) {
                const userId = {
                    _id: {
                        id: val.id
                    }
                }
                suceess = true;
                const authtoken = jwt.sign(userId, jtoken);
                res.json({ authtoken, suceess })
            }
            else {
                return res.status(500).json({ "message": "password not matched" , suceess })

            }
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
    else {
        return res.status(400).json({ "message": "Fill all field" , suceess })
    }
})


route.post('/userexits', async (req, res) => {
    let sucess = false;

    const { email, mobile } = req.body
    console.log(mobile)
    if (email || mobile) {
        const emailvarify = await user.findOne({ email })
        const mobilevarify = await user.findOne({ mobile })
        if (emailvarify) {
            sucess = true
            return res.status(200).json({ "message": "find completed", sucess })
        }
        else if (mobilevarify) {
            sucess = true
            return res.status(200).json({ "message": "find completed", sucess })
        }
        else {
            sucess = false
            return res.status(500).json({ "message": "data not found", sucess })
        }
    }
    else {
        sucess = false
        return res.status(400).json({ "message": "Fill all field", sucess })
    }
})


route.put('/forgetpass', async (req, res) => {
    let val;
    console.log(req.body)
    const { email, mobile, password } = req.body
    if ((email || mobile) && password) {
        const emailvarify = await user.findOne({ email })
        const mobilevarify = await user.findOne({ mobile })
        if (emailvarify) {
            val = emailvarify
        }
        else if (mobilevarify) {
            val = mobilevarify
        }
        else {
            return res.status(400).json({ "message": "value not exits" })
        }
        try {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            const newuser = {
                name: val.name,
                mobile: val.mobile,
                email: val.email,
                password: hash,
            }
            const updatedata = await user.findByIdAndUpdate(val.id, { $set: newuser }, { new: true })
            res.json({ message: updatedata })

        } catch (error) {
            return res.status(500).json({ error })
        }
    }
    else {
        return res.status(400).json({ "message": "Fill all field" })
    }
})

route.get('/fetchallusers', async (req, res) => {
    const mydata = await user.find()
    res.status(200).json(mydata)
})

route.post('/contect', async (req, res) => {
    console.log(req.body, "not found")
    console.log(req.body)
    const { name, email, mobile, message } = req.body
    if (name && email && mobile && message) {
        try {
            const data = await contect.create({ name, email, mobile, message })
            const response = await data.save()
            res.json({ response })
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
    else {
        return res.status(400).json({ "message": "Fill all contect field" })
    }
})

route.get('/getcontect', async(req,res)=>{
    const data = await contect.find()
    res.status(200).json( data)
})

export default route


