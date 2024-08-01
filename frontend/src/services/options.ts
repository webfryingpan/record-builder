import type { ApiResponse } from '@/types'
import { handleApiError } from '@utils/errorHandlers'
import apiClient from './client'

const fetchOptions = async (): Promise<ApiResponse> => {
	try {
		const response = await apiClient.get('/api/data')
		return { status: response.status, data: response.data }
	} catch (error) {
		return handleApiError(error)
	}
}

export default fetchOptions
