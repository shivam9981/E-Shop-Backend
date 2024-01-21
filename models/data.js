import mongoose from "mongoose";

const datamodel = new mongoose.Schema({
    name: {
        type: String,
    },
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: String,
    },
    brand: {
        type: String
    }, 
    type: {
        type: String
    }
})
const data = mongoose.model("datamodel", datamodel);
export default data