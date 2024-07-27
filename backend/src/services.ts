import fs from 'fs/promises'
import path from 'path'
import prisma from './database'
import type { BoardInspectionType, BoardInventoryType } from './types'

export const saveInspection = async (record: BoardInspectionType): Promise<void> => {
	try {
		await prisma.boardInspection.create({ data: record })
	} catch (error) {
		console.error('Error saving board inspection record:', error)
		throw new Error('Failed to save board inspection record')
	}
}

export const saveInventory = async (record: BoardInventoryType): Promise<void> => {
	try {
		await prisma.boardInventory.create({ data: record })
	} catch (error) {
		console.error('Error saving board inventory record:', error)
		throw new Error('Failed to save board inventory record')
	}
}

const readFileLines = async (filePath: string): Promise<string[]> => {
	try {
		const fileData = await fs.readFile(path.resolve(__dirname, 'data', filePath), 'utf-8')
		return fileData.split('\n').filter(line => line.trim() !== '')
	} catch (error) {
		console.error('Error reading file:', filePath, error)
		throw new Error(`Failed to read file: ${filePath}`)
	}
}

export const getInspectors = () => readFileLines('names.txt')
export const getBoards = () => readFileLines('products.txt')
export const getProblems = () => readFileLines('problems.txt')
export const getProblemTypes = () => readFileLines('problemTypes.txt')
