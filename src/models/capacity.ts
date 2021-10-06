import mongoose, { Schema } from 'mongoose'
import ICapacity from '../interfaces/capacity'

const CapacitySchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        count: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    {
        timestamps: true
    }
)

export default mongoose.model<ICapacity>('Capacity', CapacitySchema)
