import { Document } from 'mongoose'

export interface ITimeslot extends Document {
    _id: Number,
    doctorid: Number,
    fromtime: String,
    totime: String,
    date: String,
    session: Number,
}

import { model, Schema } from 'mongoose'

const timeslotSchema: Schema = new Schema({
    _id: {
        type: Number,
        required: false
    },
    fromtime:{
        type: String
    },
    totime:{
        type: String
    },
    date:{
        type: String
    },
    session:{
        type: Number
    },
    doctorid:{
        type: Number
    }

}, { collection: 'timeslots' })


export default model<ITimeslot>('Timeslot', timeslotSchema)