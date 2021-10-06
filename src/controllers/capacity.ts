import { Request, Response, NextFunction, Router } from 'express'
import mongoose from 'mongoose'
import Capacity from '../models/capacity'
import Event from '../models/event'


const create = (req: Request, res: Response, next: NextFunction) => {

    const userId = res.locals.user.id
    let { title, eventId, count, price } = req.body

    if(!eventId) {
        return res.status(400).json({
            message: 'event id missing',
        })
    }
    const _capacity = new Capacity({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        count: count,
        price: price
    })
    Event.findOneAndUpdate(
        {_id: eventId},
        { $push: {capacity: _capacity}}
    ).then((event) => {
        return res.status(201).json({
            _capacity
        })
    })
    .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

const put = (req: Request, res: Response, next: NextFunction) => {

    let { title, eventId, count, price } = req.body
    let { capacityId } = req.query 
    
    if(!capacityId) {
        return res.status(400).json({
            message: 'capacity id missing',
        })
    }

    if(!eventId) {
        return res.status(400).json({
            message: 'event id missing',
        })
    }
    Event.updateOne(
        {   _id:  mongoose.Types.ObjectId(eventId as string),
            "capacity._id": mongoose.Types.ObjectId(capacityId as string)},
        {
            $set: {
                'capacity.$.title': title,
                'capacity.$.price': price,
                'capacity.$.count': count,
            }
        }
    ).then((event) => {
            return res.status(201).json({event})
    }).catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

const deleteCapacity = (req: Request, res: Response, next: NextFunction) => {

    let { eventId } = req.body
    let { capacityId } = req.query 
    
    if(!capacityId) {
        return res.status(400).json({
            message: 'capacity id missing',
        })
    }

    if(!eventId) {
        return res.status(400).json({
            message: 'event id missing',
        })
    }
    Event.updateOne(
        {   _id:  mongoose.Types.ObjectId(eventId as string),
            "capacity._id": mongoose.Types.ObjectId(capacityId as string)},
        {
            $set: {
                'capacity.$.deleted': true,
            }
        }
    ).then((event) => {
            return res.status(201).json({event})
    }).catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}
export default { create, put, deleteCapacity }