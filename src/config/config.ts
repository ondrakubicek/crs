import dotenv from 'dotenv'

dotenv.config()
/** Database configuration */
const MONGO_OPTIONS = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	socketTimeoutMS: 30000,
	keepAlive: true,
	poolSize: 50,
	autoIndex: false,
	retryWrites: true
}

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'root'
const MONGO_PASSWORD = process.env.MONGO_USERNAME || 'root'
const MONGO_HOST = process.env.MONGO_URL || `127.0.0.1:27017`


const MONGO = {
	host: MONGO_HOST,
	password: MONGO_PASSWORD,
	username: MONGO_USERNAME,
	options: MONGO_OPTIONS,
	url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
}
console.log(MONGO.url)
/** Server configuration */
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || '127.0.0.1'
const SERVER_PORT = process.env.SERVER_PORT || 1337
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer'
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'supeprdopreseed'

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: SERVER_PORT,
	token: {
		expireTime: SERVER_TOKEN_EXPIRETIME,
		issuer: SERVER_TOKEN_ISSUER,
		secret: SERVER_TOKEN_SECRET
	}
}

const config = {
	server: SERVER,
	mongo: MONGO
}

export default config
