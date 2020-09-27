import { Response, Request } from 'express'
import { ITodo } from '../../types/todo'
import Todo from '../../models/todo'
import { IDoctor } from '../../models/doctors'
import Doctor from '../../models/doctors'
import { IAppointment } from '../../models/appointments'
import Appointment from '../../models/appointments'
import { ITimeslot } from '../../models/timeslots'
import Timeslot from '../../models/timeslots'

const getDoctors = async (req: Request, res: Response): Promise<void> => {
    try {
        const doctors: IDoctor[] = await Doctor.find()
        res.status(200).json({ doctors })
    } catch (error) {
        throw error
    }
}

const getAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const doctorid: number = Number(req.params.doctorid);
        const appointments: IAppointment[] = await Appointment.find({ date: req.params.date, doctorid: doctorid })
        res.status(200).json({ appointments })
    } catch (error) {
        throw error
    }
}

const getTimeSlots = async (req: Request, res: Response): Promise<void> => {
    try {
        const doctorid: number = Number(req.params.doctorid);
        const timeslots: ITimeslot[] = await Timeslot.find({ date: req.params.date, doctorid: doctorid })
        res.status(200).json({ timeslots })
    } catch (error) {
        throw error
    }
}

const addTimeSlot = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        if (body) {
            if ([null, undefined, ''].includes(body.fromtime)) {
                res.status(400).json('From Time missing')
            } else if ([null, undefined, ''].includes(body.totime)) {
                res.status(400).json('To Time missing')
            } else if ([null, undefined, ''].includes(body.doctorid)) {
                res.status(400).json('Doctor missing')
            } else if ([null, undefined, ''].includes(body.session)) {
                res.status(400).json('Appointment session missing')
            } else if ([null, undefined, ''].includes(body.date)) {
                res.status(400).json('Date missing')
            } else {
            // let fromtime: number = Number(body.fromtime);
            // let totime: number = Number(body.totime);
            // console.log(fromtime);
            var condition = {
                doctorid: body.doctorid,
                date: body.date,
                fromtime: { $lte: body.fromtime }, totime: { $gte: body.totime }
            };
            var condition1 = {
                doctorid: body.doctorid,
                date: body.date,
                fromtime: { $lte: body.totime }, totime: { $gte: body.fromtime }
            };
            const fromCheck: ITimeslot[] = await Timeslot.find(condition).limit(1);
            const toCheck: ITimeslot[] = await Timeslot.find(condition1);
            console.log(fromCheck);
            console.log(toCheck);
            if (fromCheck.length === 0 && toCheck.length === 0) {

                const latestRecord: ITimeslot[] = await Timeslot.find().sort({ '_id': -1 }).limit(1)
                let id = 1;
                if (latestRecord) {
                    id = Number(latestRecord[0]._id) + 1;
                }
                const timeslot: ITimeslot = new Timeslot({
                    _id: id,
                    fromtime: body.fromtime,
                    totime: body.totime,
                    date: body.date,
                    session: body.session,
                    doctorid: body.doctorid,
                })

                const newTimeslot: ITimeslot = await timeslot.save()
                // const allTimeSlots: ITimeslot[] = await Timeslot.find()
                res.status(201).json({ message: 'Timeslot added', timeslot: newTimeslot })
            } else {
                if (fromCheck.length > 0) {
                    res.status(400).json('From Time not available')
                }
                res.status(400).json('To Time not available')
            }
        }
        } else {
            res.status(400).json('Failed to get data')
        }

    } catch (error) {
        throw error
    }
}

const addAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        if (body) {
            if ([null, undefined, ''].includes(body.fromtime)) {
                res.status(400).json('From Time missing')
            } else if ([null, undefined, ''].includes(body.totime)) {
                res.status(400).json('To Time missing')
            } else if ([null, undefined, ''].includes(body.patientname)) {
                res.status(400).json('Patient nameTo missing')
            } else if ([null, undefined, ''].includes(body.contactphone)) {
                res.status(400).json('Contact phone missing')
            } else if ([null, undefined, ''].includes(body.doctorid)) {
                res.status(400).json('Appointment doctor missing')
            } else if ([null, undefined, ''].includes(body.status)) {
                res.status(400).json('Appointment status missing')
            } else if ([null, undefined, ''].includes(body.date)) {
                res.status(400).json('Date missing')
            } else {

                // let fromtime: number = Number(body.fromtime);
                // let totime: number = Number(body.totime);
                var condition = {
                    doctorid: body.doctorid,
                    date: body.date,
                    fromtime: { $lte: body.fromtime }, totime: { $gte: body.totime }
                };
                var condition1 = {
                    doctorid: body.doctorid,
                    date: body.date,
                    fromtime: { $lte: body.totime }, totime: { $gte: body.fromtime }
                };
                const fromCheck: IAppointment[] = await Appointment.find(condition).limit(1);
                const toCheck: IAppointment[] = await Appointment.find(condition1);
                console.log('fromCheck',fromCheck);
                console.log(toCheck);
                if (fromCheck.length === 0 && toCheck.length === 0) {
                    // Appointment.find().count;
                    const latestRecord: IAppointment[] = await Appointment.find().sort({ '_id': -1 }).limit(1)
                    let id = 1;
                    if (latestRecord) {
                        id = Number(latestRecord[0]._id) + 1;
                    }

                    const appoinment: IAppointment = new Appointment({
                        _id: id,
                        fromtime: body.fromtime,
                        totime: body.totime,
                        status: body.status,
                        doctorid: body.doctorid,
                        patientname: body.patientname,
                        contactphone: body.contactphone,
                        date: body.date
                    })

                    const newAppoinment: IAppointment = await appoinment.save()
                    const allAppointment: IAppointment[] = await Appointment.find()

                    res.status(201).json({ message: 'Todo added', todo: newAppoinment, todos: allAppointment })
                } else {
                    if (fromCheck.length > 0) {
                        res.status(400).json('From Time not available')
                    }
                    res.status(400).json('To Time not available')
                }
            }

        } else {
            res.status(400).json('Failed to get data')
        }
    } catch (error) {
        throw error
    }
}

export { getDoctors, getAppointments, getTimeSlots, addTimeSlot, addAppointment }
