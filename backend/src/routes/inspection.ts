import { saveInspection } from '@/controllers/inspection'
import type { BoardInspectionType } from '@/types'
import type { Request, Response } from 'express'

export default async function handleInspection(
	req: Request,
	res: Response<any, Record<string, any>>
) {
	try {
		const record: BoardInspectionType = req.body
		await saveInspection(record, +req.params.id)
		res.status(201).send('Record saved successfully')
	} catch (error) {
		console.error('Error saving inspection record:', error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}
