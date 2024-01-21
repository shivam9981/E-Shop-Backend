import express from 'express';
import data from '../models/data.js';
import size from '../models/size.js'
import color from '../models/color.js'
import carts from '../models/cart.js';
import user from '../middleware/tokenvarify.js';
import rating from '../models/rating.js';
const route = express.Router()

route.post('/datamodel', async (req, res) => {
   const { name, title, brand, image, type, price } = req.body
   if (name && title && brand && image && type && price) {
      try {
         const datares = await data.create({
            name, title, brand, image, type, price
         })
         const response = await datares.save()
         res.status(200).json({ response });
      } catch (error) {
         res.status(500).json({ error })
      }
   }
   else {
      res.status(400).json({ "message": "fill all data field" })
   }
})

route.post('/datamodelsize', async (req, res) => {
   const { id, sizetype, quantity } = req.body
   if (id && sizetype && quantity) {
      try {
         const datares = await size.create({
            id, sizetype, quantity
         })
         const response = await datares.save()
         res.status(200).json({ response });
      } catch (error) {
         res.status(500).json({ error })
      }
   }
   else {
      res.status(400).json({ "message": "fill all size field" })
   }
})

route.post('/datamodelcolor', async (req, res) => {
   const { productid, sizeid, colortype, quantity } = req.body
   if (productid && sizeid && colortype && quantity) {
      try {
         const datares = await color.create({
            productid, sizeid, colortype, quantity
         })
         const response = await datares.save()
         res.status(200).json({ response });
      } catch (error) {
         res.status(500).json({ error })
      }
   }
   else {
      res.status(400).json({ "message": "fill all color field" })
   }
})

route.get('/getallproduct', async (req, res) => {
   const mydata = await data.find()
   const mycdata = await color.find()
   res.status(200).json({ mydata, mycdata })
})

route.get('/getallcolorproduct', async (req, res) => {
   const mydata = await color.find()
   res.status(200).json(mydata)
})

route.get('/getallmaleproduct', async (req, res) => {
   const type = "Male"
   const mydata = await data.find({ type: type })
   res.status(200).json(mydata)
})
route.get('/getallfemaleproduct', async (req, res) => {
   const mydata = await data.find({ type: "Female" })
   res.status(200).json(mydata)
})
route.get('/getallchildproduct', async (req, res) => {
   const mydata = await data.find({ type: "Child" })
   res.status(200).json(mydata)
})
route.post('/getallproductbyid', async (req, res) => {
   const mydata = await data.findById(req.body.id)
   const mydata1 = await size.find({ id: req.body.id })
   const mydata2 = await color.find({ productid: req.body.id })
   res.status(200).json({ mydata, mydata1, mydata2 })
})


route.post('/cartproduct', user, async (req, res) => {
   const mydata = await data.findById(req.body.id)
   if (mydata && req.body.quantity) {
      let { brand, price, image } = mydata
      let totalprice = parseInt(price) * req.body.quantity;
      let prices = totalprice.toString()
      const response = await carts.create({
         userid: req.user, brand, price: prices, image, quantity: req.body.quantity
      })
      res.status(200).json({ data: response })
   }
   else {
      res.status(400).json({ "message": "fill all cart data field" })
   }
})
route.get('/cartproductdata', user, async (req, res) => {
   const mydata = await carts.find({ userid: req.user })
   res.status(200).json({ mydata })
})

route.delete('/cartproductdatadelete', async (req, res) => {
   const mydata = await carts.findByIdAndDelete({ _id: req.body.id })
   res.status(200).json({ message: "Cart deleted sucessfully", mydata })
})

route.post('/ratting', async (req, res) => {
   const { name, email, mobile, message, ratting, productid } = req.body
   if (name && email && mobile && message && ratting && productid) {
      console.log("data")
      try {
         const response = await rating.create({
            name, email, mobile, message, ratting, productid
         })
         const data = await response.save()
         res.status(200).json({ data })
      } catch (error) {
         res.status(500).json({ "error": error })
      }
   }
   else {
      res.status(400).json({ "message": "fill all field" })
   }
})


route.post('/getratting', async (req, res) => {
   const mydata = await rating.find({ productid: req.body.id })
   res.status(200).json({mydata})
})

export default route;