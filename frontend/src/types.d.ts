interface Options {
	inspectors: string[]
	boards: string[]
	problems: string[]
	problemTypes: string[]
}

interface BoardInspectionType {
	inspectorName: string
	boardId: string
	problemType: string
	problemDescription: string
}

export type { BoardInspectionType, Options }
