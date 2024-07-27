import fs from 'fs'
import path from 'path'
import readline from 'readline'
import prisma from './database'
import type { BoardInspectionType } from './types'

export const saveRecord = async (record: BoardInspectionType) => {
	try {
		await prisma.boardInspection.create({
			data: record,
		})
	} catch (error) {
		console.error('Error saving record:', error)
		throw error
	}
}
const readFileLines = (filePath: string): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		try {
			const lines: string[] = []
			const rl = readline.createInterface({
				input: fs.createReadStream(path.resolve(__dirname, 'data', filePath)),
				crlfDelay: Infinity,
			})

			rl.on('line', (line: string) => {
				lines.push(line)
			})

			rl.on('close', () => {
				resolve(lines)
			})
		} catch (error) {
			reject(error)
		}
	})
}

export const getInspectors = () => readFileLines('names.txt')
export const getProducts = () => readFileLines('products.txt')
export const getProblems = () => readFileLines('problems.txt')
export const getProblemTypes = () => readFileLines('problemTypes.txt')
