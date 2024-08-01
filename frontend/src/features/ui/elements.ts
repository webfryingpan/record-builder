const getElement = <T extends HTMLElement>(selector: string): T | null =>
	document.querySelector(selector)

export const elements = {
	saveInspectionBtn: getElement<HTMLButtonElement>('.save-inspection'),
	saveInventoryBtn: getElement<HTMLButtonElement>('.save-inventory'),
	fetchOptionsBtn: getElement<HTMLButtonElement>('.fetch-data'),
	statusCodeLabel: getElement<HTMLSpanElement>('.status-code span'),
	workerInput: getElement<HTMLInputElement>('#worker'),
	inspection: {
		dateField: getElement<HTMLInputElement>('.inspection #inspection-date'),
		inspectorField: getElement<HTMLSelectElement>('.inspection #inspector'),
		boardField: getElement<HTMLSelectElement>('.inspection #inspection-board'),
		problemTypeField: getElement<HTMLSelectElement>('.inspection #problem-type'),
		problemField: getElement<HTMLSelectElement>('.inspection #problem'),
	},
	inventory: {
		dateField: getElement<HTMLInputElement>('.inventory #inventory-date'),
		boardField: getElement<HTMLSelectElement>('.inventory #inventory-board'),
		quantityField: getElement<HTMLInputElement>('.inventory #quantity'),
	},
}
