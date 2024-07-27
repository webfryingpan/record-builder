import axios, { AxiosInstance, AxiosResponse } from 'axios'
import type { ApiResponse, BoardInspectionType, BoardInventoryType, Options } from './types'

const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.PUBLIC_SERVER_URL,
})

export const saveBoardInspection = async (
	record: BoardInspectionType,
	worker: number
): Promise<ApiResponse> => {
	try {
		if (!(worker == 1 || worker == 2)) return { status: 400 }

		const response: AxiosResponse = await apiClient.post(`/api/inspection/${worker}`, record)
		return { status: response.status }
	} catch (error) {
		console.error('Error saving board inspection:', error)
		throw new Error('Failed to save board inspection.')
	}
}

export const saveBoardInventory = async (
	record: BoardInventoryType,
	worker: number
): Promise<ApiResponse> => {
	try {
		if (!(worker == 1 || worker == 2)) return { status: 400 }

		const response: AxiosResponse = await apiClient.post(`/api/inventory/${worker}`, record)
		return { status: response.status }
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
