import fs from 'fs/promises'
import path from 'path'

const readFileLines = async (filePath: string): Promise<string[]> => {
	try {
		const fileData = await fs.readFile(path.resolve(__dirname, '../data', filePath), 'utf-8')
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
