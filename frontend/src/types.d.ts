interface Options {
	inspectors: string[]
	boards: string[]
	problems: string[]
	problemTypes: string[]
}

interface BoardInspectionType {
	date: Date
	week: number
	inspectorName: string
	board: string
	problemType: string
	problemDescription: string
}

interface BoardInventoryType {
	date: Date
	week: number
	quantity: number
	board: string
}

interface ApiResponse<T = Options> {
	data?: T
	status: number
}

export type { ApiResponse, BoardInspectionType, BoardInventoryType, Options }
