import mongoose from "mongoose";

const cart = new mongoose.Schema({
    image: {
        type: String,
    },
    price: {
        type: String,
    },
    brand: {
        type: String
    },
    quantity: {
        type: String
    },
    userid: {
        type: String
    }
})
const carts = mongoose.model("cartmodel", cart);
export default carts 