import axios from 'axios'

const apiClient = axios.create({
	baseURL: import.meta.env.PUBLIC_SERVER_URL,
})

export default apiClient
