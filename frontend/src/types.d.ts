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

export type { BoardInspectionType, BoardInventoryType, Options }
