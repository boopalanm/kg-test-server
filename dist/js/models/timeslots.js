"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const timeslotSchema = new mongoose_1.Schema({
    _id: {
        type: Number,
        required: false
    },
    fromtime: {
        type: String
    },
    totime: {
        type: String
    },
    date: {
        type: String
    },
    session: {
        type: Number
    },
    doctorid: {
        type: Number
    }
}, { collection: 'timeslots' });
exports.default = mongoose_1.model('Timeslot', timeslotSchema);
