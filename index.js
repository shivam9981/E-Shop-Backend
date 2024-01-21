import connection from "./DB.js";
import Express from "express";
import users from './routes/user.js'
import data from './routes/data.js'
import payment from './routes/payment/payment.js'
import cors from 'cors'
const app = Express()
const port = 5000;
app.use(cors())
app.use(Express.json())
app.use('/api/auth', users)
app.use('/api/auth/payments', payment)
app.use('/api/auth/mydata', data)

app.listen(port, () => {
    connection()
    console.log("nodemon run by 5000 port")
})
