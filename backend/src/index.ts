import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connect, disconnect } from './database'
import routes from './routes'

dotenv.config()

const app = express()
const port = process.env.SERVER_PORT || 3000

app.use(cors())
app.use(express.json())
app.use(routes)

connect().then(() => {
	app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
})

process.on('SIGINT', async () => {
	await disconnect()
	process.exit(0)
})
