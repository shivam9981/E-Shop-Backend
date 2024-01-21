import { Schema, model } from 'mongoose'

const payschema = Schema({
    respayid:{
        type:String,
        require:true
    },
    resorid:{
        type:String,
        require:true
    },
    ressig:{
        type:String,
        require:true
    }
})

const payment =  model('payment', payschema)
export default payment