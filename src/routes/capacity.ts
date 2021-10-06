import express from 'express'
import controller from '../controllers/capacity'
import checkUser from '../middleware/checkUser'

const router = express.Router()

router.post('/create', checkUser, controller.create)
router.put('/put', checkUser, controller.put)
router.put('/delete', checkUser, controller.deleteCapacity)


export = router
