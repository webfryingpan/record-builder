import axios from 'axios'

const URL = `${import.meta.env.VITE_BACKEND_URL}`

export const saveRecord = async (record: { encrypted: string }) => {
	const { status } = await axios.post(`${URL}/save`, record)
	return status
}

export const fetchData = async () => {
	const request = await axios.get(`${URL}/data`)
	return { data: request.data, status: request.status }
}
