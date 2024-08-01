import type { ApiResponse } from '@/types'
import { updateStatusLabel } from '@features/ui/handlers'

export const handleApiError = (error: unknown): ApiResponse => {
	console.error('API Error:', error)

	if (error instanceof Error) {
		return { status: 500, data: { message: error.message } }
	}

	return { status: 500, data: { message: 'An unknown error occurred.' } }
}

export const handleUIError = (error: any, message: string) => {
	console.error(message, error)
	updateStatusLabel(500)
}
