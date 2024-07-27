import axios, { AxiosInstance, AxiosResponse } from 'axios'
import type { BoardInspectionType, BoardInventoryType, Options } from './types'

const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.PUBLIC_BACKEND_URL,
})

interface ApiResponse<T = Options | BoardInspectionType | BoardInventoryType> {
	data: T
	status: number
}

export const saveBoardInspection = async (
	record: BoardInspectionType
): Promise<ApiResponse<BoardInspectionType>> => {
	try {
		const response: AxiosResponse = await apiClient.post('/api/inspection', record)
		return { data: response.data, status: response.status }
	} catch (error) {
		console.error('Error saving board inspection:', error)
		throw new Error('Failed to save board inspection.')
	}
}

export const saveBoardInventory = async (
	record: BoardInventoryType
): Promise<ApiResponse<BoardInventoryType>> => {
	try {
		const response: AxiosResponse = await apiClient.post('/api/inventory', record)
		return { data: response.data, status: response.status }
	} catch (error) {
		console.error('Error saving board inventory:', error)
		throw new Error('Failed to save board inventory.')
	}
}

export const fetchOptions = async (): Promise<ApiResponse<Options>> => {
	try {
		const response: AxiosResponse = await apiClient.get('/api/data')
		return { data: response.data, status: response.status }
	} catch (error) {
		console.error('Error fetching options:', error)
		throw new Error('Failed to fetch options.')
	}
}
