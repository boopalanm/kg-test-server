import { Document } from 'mongoose'

export interface IAppointment extends Document {
    _id: Number,
    patientname: String
    contactphone: String,
    doctorid: Number,
    date: String,
    fromtime: String,
    totime: String,
    status: Number
}

import { model, Schema } from 'mongoose'

const appointmentSchema: Schema = new Schema({
    _id: {
        type: Number
    },
    patientname: {
        type: String
    },
    contactphone:{
        type: String
    },
    date:{
        type: String
    },
    doctorid:{
        type: Number
    },
    status: {
        type: Number
    },
    fromtime:{
        type: String
    },
    totime:{
        type: String
    }

}, { collection: 'appointments' })


export default model<IAppointment>('Appointment', appointmentSchema)