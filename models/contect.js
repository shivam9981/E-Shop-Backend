import mongoose from "mongoose";

const contectmodel = mongoose.Schema({
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
    message:{
        type:String,
        require:true
    },
})

const contect = mongoose.model("contect" ,contectmodel)

export default contect;