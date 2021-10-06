import express from 'express'
import controller from '../controllers/event'
import checkUser from '../middleware/checkUser'

const router = express.Router()

router.post('/create', checkUser, controller.create)
router.get('/getAllEvents', checkUser, controller.getAllEvents)
router.get('/getEvent', checkUser, controller.getEvent)


export = router
