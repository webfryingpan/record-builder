import { BoardInspectionType } from '@/types'
import prisma from './database'

export const saveInspection = async (
	record: BoardInspectionType,
	worker: number
): Promise<void> => {
	try {
		if (worker == 1) await prisma.boardInspection1.create({ data: record })
		else if (worker == 2) await prisma.boardInspection2.create({ data: record })
	} catch (error) {
		console.error('Error saving board inspection record:', error)
		throw new Error('Failed to save board inspection record')
	}
}
