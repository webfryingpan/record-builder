import { Request, Response, Router } from 'express'
import { decryptData, encryptData } from './encryption'
import { parseHex } from './lib'
import { getInspectors, getProblems, getProblemTypes, getProducts, saveRecord } from './services'
import { IRecord } from './types'

const router = Router()

router.post('/save', async (req: Request, res: Response) => {
	const [ivHex, encrypted] = req.body.encrypted.split(':')
	const iv = parseHex(ivHex)

	try {
		const record = JSON.parse(decryptData(encrypted, iv)) as IRecord
		await saveRecord(record)
		res.status(201).send('Saved record')
	} catch (error) {
		console.error('Error during decryption or saving:', error)
		res.status(500).send('Error saving record')
	}
})

router.get('/data', async (req: Request, res: Response) => {
	try {
		const [inspectors, products, problems, problemTypes] = await Promise.all([
			getInspectors(),
			getProducts(),
			getProblems(),
			getProblemTypes(),
		])

		res.status(200).json(
			encryptData(
				JSON.stringify({
					inspectors,
					products,
					problems,
					problemTypes,
				})
			)
		)
	} catch (error) {
		console.error('Error fetching data:', error)
		res.status(500).send('Error fetching data')
	}
})

export default router
