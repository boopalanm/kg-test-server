"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const appointmentSchema = new mongoose_1.Schema({
    _id: {
        type: Number
    },
    patientname: {
        type: String
    },
    contactphone: {
        type: String
    },
    date: {
        type: String
    },
    doctorid: {
        type: Number
    },
    status: {
        type: Number
    },
    fromtime: {
        type: String
    },
    totime: {
        type: String
    }
}, { collection: 'appointments' });
exports.default = mongoose_1.model('Appointment', appointmentSchema);
