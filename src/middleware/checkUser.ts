import { Request, Response, NextFunction, Router } from 'express'
import config from '../config/config'
import UserSchema from '../models/user'
import jwt, { decode } from 'jsonwebtoken'
import logging from '../config/logging'


const NAMESPACE = 'Auth'

const checkUser = async (req: Request, res: Response, next: NextFunction) => {

    logging.info(NAMESPACE, 'Check user')
	let token = req.headers.authorization?.split(' ')[1]

    if (token) {
         await jwt.verify(token, config.server.token.secret, async (error, decoded) => {
            if(error){
                logging.error(NAMESPACE,error.message)
            } else {
                if(decoded) {
                    const user = (await UserSchema.find({ username: decoded.username }).exec())[0]
                    res.locals.user = user
                }
            }
        })
        
    }
    if(res.locals.user){
        next()
    } else {
        return res.status(401).json({
			message: 'Unauthorized'
		})
    }
}

export default checkUser