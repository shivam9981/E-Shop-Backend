import mongoose from "mongoose";

const data = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:"Customer"
    }, 
})

const user = mongoose.model("user_data" ,data)

export default user;