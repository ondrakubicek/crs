import mongoose, { Schema } from 'mongoose'
import IEvent from '../interfaces/event'

const EventSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        ownerId: { type: String, required: true },
        capacity: { type: Array, required: false},
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IEvent>('Event', EventSchema)
