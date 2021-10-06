import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import logging from './config/logging'
import config from './config/config'
import userRooutes from './routes/user'
import eventRooutes from './routes/event'
import capacityRoutes from './routes/capacity'

import mongoose, { mongo } from 'mongoose'

const NAMESPACE = 'Server'
const router = express()

/** Connect to Mongo */
mongoose
	.connect(config.mongo.url, config.mongo.options)
	.then((result) => {
		logging.info(NAMESPACE, 'Mongo Connected')
	})
	.catch((error) => {
		logging.error(NAMESPACE, error.message, error)
	})

/** Logging the request */
router.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
	if (req.method == "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}

	logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP [${req.socket.remoteAddress}]`)
	res.on('finish', () => {
		;`METHOD - [${req.method}], URL - [${req.url}, IP [${req.socket.remoteAddress}], STATUS ${res.status}]`
	})
	next()
})

   

/** Parse the request */
router.use(express.urlencoded({ extended: false }))
router.use(express.json())

/** rolues of our API */
router.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authotizetion')
	if (req.method == 'OPTIONs') {
		res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT')
		return res.status(200).json({})
	}
	next()
})

/** Routes */
router.use('/user', userRooutes)
router.use('/event', eventRooutes)
router.use('/capacity', capacityRoutes)

/** Error Handling */
router.use((req, res, next) => {
	const error = new Error('not found')

	return res.status(404).json({
		message: error.message
	})
	next()
})

/** Create the server */
const httpServer = http.createServer(router)
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`))
