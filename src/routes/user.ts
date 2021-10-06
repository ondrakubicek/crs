import express from 'express'
import controller from '../controllers/user'
import extractJWT from '../middleware/extractJWT'
import checkUser from '../middleware/checkUser'

const router = express.Router()

router.get('/validate', extractJWT, controller.validateToken)
router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/getAllusers', checkUser, controller.getAllusers)

export = router
