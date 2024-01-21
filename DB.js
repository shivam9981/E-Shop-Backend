import mongoose from "mongoose";

const mongo = 'mongodb+srv://shivamgee6:shivam@cluster0.6ijguq1.mongodb.net/'
// const mongo = 'mongodb://localhost:27017/ESHOP'

const connection = async()=>{ 
    await mongoose.connect(mongo , {
    useNewUrlparser: true,
    useUnifiedTopology: true,
}).then( ()=>{
    console.log("database connection done")
}).catch((Error)=>{
    console.log(Error)
})}

export default connection
 