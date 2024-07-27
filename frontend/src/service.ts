import axios from 'axios'
import type { BoardInspectionType } from './types'

const URL = `${import.meta.env.PUBLIC_BACKEND_URL}`

export const saveRecord = async (record: BoardInspectionType) => {
	const { status } = await axios.post(`${URL}/api/save`, record)
	return status
}

export const fetchData = async () => {
	const request = await axios.get(`${URL}/api/data`)
	return { data: request.data, status: request.status }
}
