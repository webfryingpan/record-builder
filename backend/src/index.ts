import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connect, disconnect } from './database'
import routes from './routes'

dotenv.config()

const app = express()
const port = +process.env.SERVER_PORT! || 443

app.use(cors())
app.use(express.json())
app.use(routes)

connect().then(() =>
	app.listen(port, '0.0.0.0', () => {
		console.log(`HTTPS server is running on port ${port}`)
	})
)

process.on('SIGINT', async () => {
	await disconnect()
	process.exit(0)
})
