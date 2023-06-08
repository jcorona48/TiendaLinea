import {Schema, model} from 'mongoose'

const producSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    imgURL: {
        type: String
    },
    stock: {
        type: Number,
        required: true
    },
    category: [{
        ref: "Category",
        type: Schema.Types.ObjectId
    }]
},
    {
        timestamps: true,
        versionKey: false 
})


export default model('Product',producSchema);