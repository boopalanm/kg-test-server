import { Document } from 'mongoose'

export interface IDoctor extends Document {
    doctorid: Number,
    fullname: String,
    contactname: String,
    contactemail: String,
    contactphone: String,
    active: Boolean,
    qualification: String,
    image: String,
    password: String,
}

import { model, Schema } from 'mongoose'

const doctorSchema: Schema = new Schema({
    _id: {
        type: Number
    },
    fullname: {
        type: String
    },
    contactname:{
        type: String
    },
    contactemail:{
        type: String
    },
    contactphone:{
        type: String
    },
    active: {
        type: Boolean
    },
    qualification:{
        type: String
    },
    image:{
        type: String
    },
    password: {
        type: String
    }

}, { collection: 'doctors' })


export default model<IDoctor>('Doctor', doctorSchema)