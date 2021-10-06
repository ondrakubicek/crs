import { Request, Response, NextFunction, Router } from 'express'
import config from "../config/config";
import mongoose from 'mongoose'
import Event from '../models/event'


const create = (req: Request, res: Response, next: NextFunction) => {

    const userId = res.locals.user.id
    let { title } = req.body

    const _event = new Event({
        _id: new mongoose.Types.ObjectId(),
        title,
        ownerId: userId,
    })

    return _event
        .save()
        .then((event) => {
            return res.status(201).json({
                event
            })
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}

const getAllEvents = (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user.id
    Event.find({ownerId: userId})
		.exec()
		.then((events) => {
			return res.status(200).json({
				events,
				count: events.length
			})
		})
		.catch((error) => {
			return res.status(500).json({
				message: error.message,
				error
			})
		})

}

const getEvent = (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.user.id
    let { eventId } = req.query

    if(!eventId) {
        return res.status(400).json({
            message: 'event id missing',
        })
    }
    Event.findById(eventId).then((event) => {
            return res.status(201).json({
                event
            })
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}
export default { create, getAllEvents, getEvent }