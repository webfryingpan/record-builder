import { Request, Response, Router } from 'express'
import {
	getBoards,
	getInspectors,
	getProblems,
	getProblemTypes,
	saveInspection,
	saveInventory,
} from './service'
import type { BoardInspectionType, BoardInventoryType } from './types'

const router = Router()

router.post('/api/inspection/:id', async (req: Request, res: Response) => {
	try {
		const record: BoardInspectionType = req.body
		await saveInspection(record, +req.params.id)
		res.status(201).send('Record saved successfully')
	} catch (error) {
		console.error('Error saving inspection record:', error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
})

router.post('/api/inventory/:id', async (req: Request, res: Response) => {
	try {
		const record: BoardInventoryType = req.body
		await saveInventory(record, +req.params.id)
		res.status(201).send('Record saved successfully')
	} catch (error) {
		console.error('Error saving inventory record:', error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
})

router.get('/api/data', async (req: Request, res: Response) => {
	try {
		const [inspectors, boards, problems, problemTypes] = await Promise.all([
			getInspectors(),
			getBoards(),
			getProblems(),
			getProblemTypes(),
		])
		res.status(200).json({ inspectors, boards, problems, problemTypes })
	} catch (error) {
		console.error('Error fetching data:', error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
})

export default router
