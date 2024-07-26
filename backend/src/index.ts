import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectToDatabase, disconnectFromDatabase } from './database'
import routes from './routes'

dotenv.config()

const app = express()
const port = process.env.SERVER_PORT || 3000

app.use(cors())
app.use(express.json())
app.use(routes)

const startServer = async () => {
	await connectToDatabase()
	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}`)
	})
}

startServer()

process.on('SIGINT', async () => {
	await disconnectFromDatabase()
	process.exit(0)
})
