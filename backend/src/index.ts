import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
import https from 'https'
import path from 'path'
import { connect, disconnect } from './database'
import routes from './routes'

dotenv.config()

const app = express()
const port = process.env.SERVER_PORT || 443

app.use(cors())
app.use(express.json())
app.use(routes)

const credentials = {
	key: fs.readFileSync(path.resolve(__dirname, 'secret/privateKey.pem')),
	cert: fs.readFileSync(path.resolve(__dirname, 'secret/certificate.pem')),
}

connect().then(() =>
	https.createServer(credentials, app).listen(port, () => {
		console.log(`HTTPS server is running on port ${port}`)
	})
)

process.on('SIGINT', async () => {
	await disconnect()
	process.exit(0)
})
