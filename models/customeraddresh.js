import mongoose from "mongoose";

const addre = new mongoose.Schema({
    userid: {
        type: String
    },
    name: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    city: {
        type: String
    },
    addresh: {
        type: String
    },
    road: {
        type: String
    },
    pin: {
        type: String
    },
    distict: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    }
    
})
const addresh = mongoose.model("addresh", addre);
export default addresh