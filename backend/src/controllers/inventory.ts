import { BoardInventoryType } from '@/types'
import prisma from './database'

export const saveInventory = async (record: BoardInventoryType, worker: number): Promise<void> => {
	try {
		if (worker == 1) await prisma.boardInventory1.create({ data: record })
		else if (worker == 2) await prisma.boardInventory2.create({ data: record })
	} catch (error) {
		console.error('Error saving board inventory record:', error)
		throw new Error('Failed to save board inventory record')
	}
}
