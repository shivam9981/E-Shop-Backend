import mongoose from "mongoose";

const rating = mongoose.Schema({
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
    productid:{
        type:String,
        require:true
    },
    ratting:{
        type:String,
    },
    message:{
        type:String
    }, 
    Date:{
        type:Date,
        default: Date.now
    }
})

const ratting = mongoose.model("ratting" ,rating)

export default ratting;