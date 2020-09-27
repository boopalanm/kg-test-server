"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const doctorSchema = new mongoose_1.Schema({
    _id: {
        type: Number
    },
    fullname: {
        type: String
    },
    contactname: {
        type: String
    },
    contactemail: {
        type: String
    },
    contactphone: {
        type: String
    },
    active: {
        type: Boolean
    },
    qualification: {
        type: String
    },
    image: {
        type: String
    },
    password: {
        type: String
    }
}, { collection: 'doctors' });
exports.default = mongoose_1.model('Doctor', doctorSchema);
