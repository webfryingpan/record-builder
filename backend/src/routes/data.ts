import { getBoards, getInspectors, getProblems, getProblemTypes } from '@utils/reading'
import type { Response } from 'express'

export default async function handleData(res: Response<any, Record<string, any>>) {
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
}
