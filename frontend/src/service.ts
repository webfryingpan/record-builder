import axios from 'axios'

const URL = `http://${import.meta.env.VITE_BACKEND_URL}`

export const saveRecord = async (record: { encrypted: string }) => {
	try {
		const { status } = await axios.post(`${URL}/save`, record)
		return status
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return error.message
		} else {
			return 'An unexpected error occurred'
		}
	}
}

export const fetchData = async () => {
	try {
		const request = await axios.get(`${URL}/data`)
		return request.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return error.message
		} else {
			return 'An unexpected error occurred'
		}
	}
}
