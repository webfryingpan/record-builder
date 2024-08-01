import { connect, disconnect } from '@controllers/database'
import routes from '@routes/routes'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()
const port = process.env.SERVER_PORT || 3002

app.use(cors())
app.use(express.json())
app.use(routes)

const start = async () => {
	await connect().then(() =>
		app.listen(port, () => {
			console.log(`HTTP server is running on localhost:${port}`)
		})
	)
}

start()

process.on('SIGINT', async () => {
	await disconnect()
	process.exit(0)
})
