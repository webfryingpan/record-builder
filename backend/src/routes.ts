import { Request, Response, Router } from 'express'
import { decrypt, encrypt } from './encryption'
import { parseHex } from './lib'
import { getInspectors, getProblems, getProblemTypes, getProducts, saveRecord } from './services'
import type { Record } from './types'

const router = Router()

router.post('/save', async (req: Request, res: Response) => {
	try {
		const [ivHex, encrypted] = req.body.encrypted.split(':')
		const iv = parseHex(ivHex)

		if (!iv || !encrypted) throw new Error('Incorrect request body')

		const decrypted = decrypt(encrypted, iv)
		const record = JSON.parse(decrypted) as Record

		await saveRecord(record)
		res.status(201).send('Saved record')
	} catch (error) {
		if (error instanceof SyntaxError) res.status(400).send('Incorrect JSON data')
		else if (error instanceof Error) res.status(500).send('Internal server error')
		else res.status(500).send('Unexpected error')

		console.error(error)
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
			encrypt(
				JSON.stringify({
					inspectors,
					products,
					problems,
					problemTypes,
				})
			)
		)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
})

export default router
