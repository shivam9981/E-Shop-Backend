import jwt from 'jsonwebtoken';
const jtoken = "SHIVAMGUPTA"

const user = (req,res,next)=>{
    const token = req.header('token')
    if (!token) {
        return res.status(500).json({"message":'token not found'})
    }
    try {
        const id = jwt.verify(token,jtoken)
        req.user = id._id.id
        next()
    } catch (error) {
        console.log(error)
    }
}
export default user;