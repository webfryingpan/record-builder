import type { BoardInventoryType } from '@/types'
import { saveInventory } from '@controllers/inventory'
import type { Request, Response } from 'express'

export default async function handleInventory(req: Request, res: Response) {
	try {
		const record: BoardInventoryType = req.body
		await saveInventory(record, +req.params.id)
		res.status(201).send('Record saved successfully')
	} catch (error) {
		console.error('Error saving inventory record:', error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}
