import {Schema, model} from 'mongoose'

const clientSchema = new Schema({
    name: {
        type: String
    },
    DNI:{
        type: String,
        unique: true
    },
    adress:{
        type: String
    },
    phone: {
        type: String
    },
    birthdate: {
        type: String
    },
    gender: {
        type: String
    },
    status: {
        type: String
    }
},
    {
        timestamps: true,
        versionKey: false 
})


export default model('Client',clientSchema);