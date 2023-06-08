import {Schema, model} from 'mongoose'

const categorySchema = new Schema({
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


export default model('Category',categorySchema);