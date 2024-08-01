import type { ApiResponse, BoardInventoryType } from '@/types'
import { handleApiError } from '@utils/errorHandlers'
import { workerGuard } from '@utils/guards'
import apiClient from './client'

const saveBoardInventory = async (
	record: BoardInventoryType,
	worker: number
): Promise<ApiResponse> => {
	try {
		if (workerGuard(worker)) return { status: 400, data: { message: 'Unexpected worker number' } }

		const response = await apiClient.post(`/api/inventory/${worker}`, record)
		return { status: response.status, data: { message: 'Successful' } }
	} catch (error) {
		return handleApiError(error)
	}
}

export default saveBoardInventory
