import type { ApiResponse, BoardInspectionType } from '@/types'
import { handleApiError } from '@utils/errorHandlers'
import { workerGuard } from '@utils/guards'
import apiClient from './client'

const saveBoardInspection = async (
	record: BoardInspectionType,
	worker: number
): Promise<ApiResponse> => {
	try {
		if (workerGuard(worker)) return { status: 400, data: { message: 'Unexpected worker number' } }

		const response = await apiClient.post(`/api/inspection/${worker}`, record)
		return { status: response.status, data: { message: 'Successful' } }
	} catch (error) {
		return handleApiError(error)
	}
}

export default saveBoardInspection
