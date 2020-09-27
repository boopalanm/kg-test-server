import { Router } from 'express'
import { getDoctors, getAppointments, getTimeSlots, addTimeSlot, addAppointment } from '../controllers/collections'
 
const router: Router = Router()

// doctors collections

router.get('/api/doctors/get-lists', getDoctors)
router.get('/api/doctors/get-timeslots/:date/:doctorid', getTimeSlots)
router.get('/api/doctors/get-appointments/:date', getAppointments)
router.get('/api/doctors/get-appointments/:date/:doctorid', getAppointments)
router.post('/api/doctors/add-timeslot', addTimeSlot)
router.post('/api/doctors/add-appointment', addAppointment)



export default router
