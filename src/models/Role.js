import {Schema, model} from 'mongoose'

const roleSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String
    }
},
    {
        timestamps: true,
        versionKey: false 
})


export default model('Role',roleSchema);