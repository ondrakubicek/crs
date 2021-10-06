import jwt from 'jsonwebtoken'
import { callbackify } from 'util'
import config from '../config/config'
import logging from '../config/logging'
import IUser from '../interfaces/user'

const NAMESPACE = 'Auth'

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
	var timeSinceEpoch = new Date().getTime()
	var expireTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000
	var expiratimonTimeInSeconds = Math.floor(expireTime / 1000)

	logging.info(NAMESPACE, `Attemptiong to sign token for ${user.username}`)

	try {
		jwt.sign(
			{
				username: user.username
			},
			config.server.token.secret,
			{
				issuer: config.server.token.issuer,
				algorithm: 'HS256',
				expiresIn: expiratimonTimeInSeconds
			},
			(error, token) => {
				if (error) {
					callback(error, null)
				} else if (token) {
					callback(null, token)
				}
			}
		)
	} catch (error) {
		logging.error(NAMESPACE, error.message, error)
		callback(error, null)
	}
}

export default signJWT
