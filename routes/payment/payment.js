import express from 'express';
import user from '../../middleware/tokenvarify.js'
import customeraddresh from '../../models/customeraddresh.js'
import Razorpay from 'razorpay'
import payment from '../../models/payment.js';
let KEY_ID = "rzp_test_5xkmIzFrGoU1yg";
let SECERT_ID = "nkBSTNYL6UvafYnnQto68lws";
const route = express.Router()

route.post('/addresh', user, async (req,res)=>{
    const {name, email, mobile,city, addresh, road , country , state, pin , distict} = req.body
    if (name && mobile && city && addresh   && country && state && pin && distict) {
            const addreshdata = await customeraddresh.create({userid:req.user , name, email, mobile,city, addresh, road , country , state, pin , distict})
           res.status(200).json({addreshdata})
    }else{
        return res.status(400).json({'message':"Fill all field"})
    }
})

route.get('/getaddresh', user , async(req,res)=>{
    const data = await customeraddresh.find({userid:req.user})
    res.status(200).json({data})
})

route.post('/addreshbyid', user , async(req,res)=>{
    const data = await customeraddresh.find({_id:req.body.id})
    res.status(200).json( {data})
})


route.post('/checkout', async (req, res) => {
   // payment gateway
    let instance = new Razorpay({
        key_id: KEY_ID,
        key_secret: SECERT_ID,
    });
    const options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
    };
    const order = await instance.orders.create(options)
    res.json({ order, KEY_ID })
})


route.post('/verify', async (req, res) => {
    console.log("done")
    let success = false
    let body = req.body.resorid + "|" + req.body.respayid;
    const expectedSignature = crypto.createHmac('sha256', SECERT_ID)
        .update(body.toString())
        .digest('hex');

    const { respayid, resorid, ressig } = req.body
    if (expectedSignature === req.body.ressig) {
        const saved = await payment.create({
            respayid: respayid,
            resorid: resorid,
            ressig: ressig
        })
        const data = await saved.save()
        if (data) {
            success = true
            res.json(success)
        }
        else {
            res.json(success)
        }
    }

})


export default route