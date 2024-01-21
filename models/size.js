import mongoose from "mongoose";

const size = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'datamodel',
    },
    productid:{
        type:String
    },
    sizetype: {
        type: String
    },
    quantity: {
        type: String
    }
})
const dsize = mongoose.model("size", size);
export default dsize