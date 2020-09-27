"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collections_1 = require("../controllers/collections");
const router = express_1.Router();
// doctors collections
router.get('/api/doctors/get-lists', collections_1.getDoctors);
router.get('/api/doctors/get-timeslots/:date/:doctorid', collections_1.getTimeSlots);
router.get('/api/doctors/get-appointments/:date', collections_1.getAppointments);
router.get('/api/doctors/get-appointments/:date/:doctorid', collections_1.getAppointments);
router.post('/api/doctors/add-timeslot', collections_1.addTimeSlot);
router.post('/api/doctors/add-appointment', collections_1.addAppointment);
exports.default = router;
