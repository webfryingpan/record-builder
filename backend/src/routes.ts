import { Request, Response, Router } from 'express'
import { getInspectors, getProblems, getProblemTypes, getProducts, saveRecord } from './services'
import { BoardInspectionType } from './types'

const router = Router()

router.post('/api/save', async (req: Request, res: Response) => {
	try {
		await saveRecord(req.body as BoardInspectionType)
		res.status(201).send('Saved record')
	} catch (error) {
		console.error('Error saving record:', error)
		res.status(500).send('Internal Server Error')
	}
})

router.get('/api/data', async (req: Request, res: Response) => {
	try {
		const [inspectors, products, problems, problemTypes] = await Promise.all([
			getInspectors(),
			getProducts(),
			getProblems(),
			getProblemTypes(),
		])
		res.status(200).json({
			inspectors,
			products,
			problems,
			problemTypes,
		})
	} catch (error) {
		console.error('Error fetching data: ' + error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
})

export default router
