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

interface ApiResponse {
	data: Options | { message: string }
	status: number
}

type Timeout = ReturnType<typeof setTimeout>

export type { ApiResponse, BoardInspectionType, BoardInventoryType, Options, Timeout }
