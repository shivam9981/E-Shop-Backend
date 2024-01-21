
import mongoose from "mongoose";

const color = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'size',
    },
    sizeid: {
        type: String
    },
    productid: {
        type: String
    },
    colortype: {
        type: String,
    },
    quantity: {
        type: String,
    }
    
})

const dcolor = mongoose.model("color", color);
export default dcolor