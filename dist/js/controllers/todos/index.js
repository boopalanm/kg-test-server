"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAppointments = exports.addTimeSlot = exports.getTimeSlots = exports.getAppointments = exports.getDoctors = void 0;
const doctors_1 = __importDefault(require("../../models/doctors"));
const appointments_1 = __importDefault(require("../../models/appointments"));
const timeslots_1 = __importDefault(require("../../models/timeslots"));
const getDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctors_1.default.find();
        res.status(200).json({ doctors });
    }
    catch (error) {
        throw error;
    }
});
exports.getDoctors = getDoctors;
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorid = Number(req.params.doctorid);
        const appointments = yield appointments_1.default.find({ date: req.params.date, doctorid: doctorid });
        res.status(200).json({ appointments });
    }
    catch (error) {
        throw error;
    }
});
exports.getAppointments = getAppointments;
const getTimeSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorid = Number(req.params.doctorid);
        const timeslots = yield timeslots_1.default.find({ date: req.params.date, doctorid: doctorid });
        res.status(200).json({ timeslots });
    }
    catch (error) {
        throw error;
    }
});
exports.getTimeSlots = getTimeSlots;
const addTimeSlot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (body) {
            let fromtime = Number(body.fromtime);
            let totime = Number(body.totime);
            console.log(fromtime);
            var condition = {
                doctorid: body.doctorid,
                date: body.date,
                fromtime: { $lte: fromtime }, totime: { $gte: totime }
            };
            var condition1 = {
                doctorid: body.doctorid,
                date: body.date,
                fromtime: { $lte: totime }, totime: { $gte: fromtime }
            };
            const fromCheck = yield timeslots_1.default.find(condition).limit(1);
            const toCheck = yield timeslots_1.default.find(condition1);
            console.log(fromCheck);
            console.log(toCheck);
            if (fromCheck.length === 0 && toCheck.length === 0) {
                const latestRecord = yield timeslots_1.default.find().sort({ '_id': -1 }).limit(1);
                let id = 1;
                if (latestRecord) {
                    id = Number(latestRecord[0]._id) + 1;
                }
                const timeslot = new timeslots_1.default({
                    _id: id,
                    fromtime: body.fromtime,
                    totime: body.totime,
                    date: body.date,
                    session: body.session,
                    doctorid: body.doctorid,
                });
                const newTimeslot = yield timeslot.save();
                const allTimeSlots = yield timeslots_1.default.find();
                res.status(201).json({ message: 'Timeslot added', timeslot: newTimeslot, timeslots: allTimeSlots });
            }
            else {
                if (fromCheck.length > 0) {
                    res.status(400).json('From Time not available');
                }
                res.status(400).json('To Time not available');
            }
        }
        else {
            res.status(400).json('Failed to get data');
        }
    }
    catch (error) {
        throw error;
    }
});
exports.addTimeSlot = addTimeSlot;
const addAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (body) {
            // if ([null, undefined, ''].includes(body.fromtime)) {
            //     res.status(400).json('From Time missing')
            // } else if ([null, undefined, ''].includes(body.totime)) {
            //     res.status(400).json('To Time missing')
            // } else if ([null, undefined, ''].includes(body.patientname)) {
            //     res.status(400).json('Patient nameTo missing')
            // } else if ([null, undefined, ''].includes(body.contactphone)) {
            //     res.status(400).json('Contact phone missing')
            // } else if ([null, undefined, ''].includes(body.doctorid)) {
            //     res.status(400).json('Appointment doctor missing')
            // } else {
            //     let fromtime: number = Number(body.fromtime);
            //     let totime: number = Number(body.totime);
            //     var condition = {
            //         doctorid: body.doctorid,
            //         date: body.date,
            //         fromtime: { $lte: fromtime }, totime: { $gte: totime }
            //     };
            //     var condition1 = {
            //         doctorid: body.doctorid,
            //         date: body.date,
            //         fromtime: { $lte: totime }, totime: { $gte: fromtime }
            //     };
            //     const fromCheck: ITimeslot[] = await Timeslot.find(condition).limit(1);
            //     const toCheck: ITimeslot[] = await Timeslot.find(condition1);
            //     console.log(fromCheck);
            //     console.log(toCheck);
            //     if (fromCheck.length === 0 && toCheck.length === 0) {
            //         const latestRecord: IAppointment[] = await Appointment.find().sort({ '_id': -1 }).limit(1)
            //         let id = 1;
            //         if (latestRecord) {
            //             id = Number(latestRecord[0]._id) + 1;
            //         }
            //         const appoinment: IAppointment = new Appointment({
            //             _id: id,
            //             fromtime: body.fromtime,
            //             totime: body.totime,
            //             status: body.status,
            //             doctorid: body.doctorid,
            //             patientname: body.patientname,
            //             contactphone: body.contactphone,
            //             date: body.date
            //         })
            //         const newAppoinment: IAppointment = await appoinment.save()
            //         const allAppointment: IAppointment[] = await Appointment.find()
            //         res.status(201).json({ message: 'Todo added', todo: newAppoinment, todos: allAppointment })
            //     } else {
            //         if (fromCheck.length > 0) {
            //             res.status(400).json('From Time not available')
            //         }
            //         res.status(400).json('To Time not available')
            //     }
            // }
            res.status(400).json('Failed to get data');
        }
        else {
            res.status(400).json('Failed to get data');
        }
    }
    catch (error) {
        throw error;
    }
});
exports.addAppointments = addAppointments;
