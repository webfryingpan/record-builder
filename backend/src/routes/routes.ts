import type { Request, Response } from 'express'
import { Router } from 'express'
import handleData from './data'
import handleInspection from './inspection'
import handleInventory from './inventory'

const router = Router()

router.post('/api/inspection/:id', async (req: Request, res: Response) => {
	await handleInspection(req, res)
})

router.post('/api/inventory/:id', async (req: Request, res: Response) => {
	await handleInventory(req, res)
})

router.get('/api/data', async (req: Request, res: Response) => {
	await handleData(res)
})

export default router
