import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const connectToDatabase = async () => {
	try {
		await prisma.$connect()
	} catch (error) {
		console.error('Error connecting to the database:', error)
		process.exit(1)
	}
}

export const disconnectFromDatabase = async () => {
	await prisma.$disconnect()
}

export default prisma
