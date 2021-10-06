import mongoose, { Schema } from 'mongoose'
import IUser from '../interfaces/user'

const UserSchema: Schema = new Schema(
	{
		username: { type: String, required: true },
		password: { type: String, required: true },
		group: {type: String, required: true}
	},
	{
		timestamps: true
	}
)

export default mongoose.model<IUser>('Users', UserSchema)
