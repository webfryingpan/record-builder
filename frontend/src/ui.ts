import { getWeekNumber } from './lib'
import { fetchOptions, saveBoardInspection, saveBoardInventory } from './service'
import type { Options } from './types'

let timeout: ReturnType<typeof setTimeout>

const saveInspectionBtn = document.querySelector<HTMLButtonElement>('.save-inspection')
const saveInventoryBtn = document.querySelector<HTMLButtonElement>('.save-inventory')
const fetchOptionsBtn = document.querySelector<HTMLButtonElement>('.fetch-data')
const statusCodeLabel = document.querySelector<HTMLSpanElement>('.status-code span')
const workerInput = document.querySelector<HTMLInputElement>('#worker')

namespace inspection {
	const prefix = 'inspection'

	export const dateField = document.querySelector<HTMLInputElement>(`.${prefix}  #${prefix}-date`)
	export const inspectorField = document.querySelector<HTMLSelectElement>(`.${prefix} #inspector`)
	export const boardField = document.querySelector<HTMLSelectElement>(`.${prefix} #${prefix}-board`)
	export const problemTypeField = document.querySelector<HTMLSelectElement>(
		`.${prefix} #problem-type`
	)
	export const problemField = document.querySelector<HTMLSelectElement>(`.${prefix} #problem`)
}

namespace inventory {
	const prefix = 'inventory'

	export const dateField = document.querySelector<HTMLInputElement>(`.${prefix} #${prefix}-date`)
	export const boardField = document.querySelector<HTMLSelectElement>(`.${prefix} #${prefix}-board`)
	export const quantityField = document.querySelector<HTMLInputElement>(`.${prefix} #quantity`)
}

const fillFields = (data: Options) => {
	setOptions(inspection.inspectorField, data.inspectors)
	setOptions(inspection.boardField, data.boards)
	setOptions(inspection.problemField, data.problems)
	setOptions(inspection.problemTypeField, data.problemTypes)

	setOptions(inventory.boardField, data.boards)
}

const loadLocal = () => {
	const data = localStorage.getItem('data')
	if (data) fillFields(JSON.parse(data))
}

const setOptions = (field: HTMLSelectElement | null, values: string[]) => {
	if (!field) return

	field.innerHTML = '<option value="">None</option>'

	values.forEach(value => {
		const option = document.createElement('option')
		option.value = value
		option.textContent = value
		field.appendChild(option)
	})
}

const updateStatusLabel = (status: number) => {
	if (!statusCodeLabel) return

	statusCodeLabel.style.visibility = 'visible'
	statusCodeLabel.textContent = status.toString()
	statusCodeLabel.style.color = status === 201 || status === 200 ? 'green' : 'red'

	if (timeout) clearTimeout(timeout)

	timeout = setTimeout(() => {
		statusCodeLabel.style.visibility = 'hidden'
	}, 5000)
}

const handleInspectionBtn = async () => {
	if (
		inspection.dateField &&
		inspection.inspectorField &&
		inspection.boardField &&
		inspection.problemTypeField &&
		inspection.problemField &&
		workerInput
	) {
		const date = new Date(inspection.dateField.value)

		try {
			await saveBoardInspection(
				{
					date,
					week: getWeekNumber(date),
					inspectorName: inspection.inspectorField.value,
					board: inspection.boardField.value,
					problemType: inspection.problemTypeField.value,
					problemDescription: inspection.problemField.value,
				},
				+workerInput.value
			).then(({ status }) => updateStatusLabel(status))
		} catch (error) {
			console.error('Error saving board inspection:', error)
			updateStatusLabel(500)
		}
	}
}

const handleInventoryBtn = async () => {
	if (inventory.dateField && inventory.boardField && inventory.quantityField && workerInput) {
		const date = new Date(inventory.dateField.value)

		try {
			await saveBoardInventory(
				{
					date,
					week: getWeekNumber(date),
					board: inventory.boardField.value,
					quantity: +inventory.quantityField.value,
				},
				+workerInput.value
			).then(({ status }) => updateStatusLabel(status))
		} catch (error) {
			console.error('Error saving board inventory:', error)
			updateStatusLabel(500)
		}
	}
}

const handleFetchButton = async () => {
	try {
		const { data, status } = await fetchOptions()
		updateStatusLabel(status)
		if (!data) throw new Error('Unexpected error')
		fillFields(data)
		localStorage.setItem('data', JSON.stringify(data))
	} catch (error) {
		console.error('Error fetching options:', error)
		updateStatusLabel(500)
	}
}

const setTodayDate = () => {
	const today = new Date().toISOString().split('T')[0]
	if (inspection.dateField) inspection.dateField.value = today
	if (inventory.dateField) inventory.dateField.value = today
}

const updateWeekLabel = (selectorPrefix: string, dateField: HTMLInputElement | null) => {
	if (!dateField) return
	const weekNumber = getWeekNumber(new Date(dateField.value)).toString()
	const label = document.querySelector<HTMLSpanElement>(`${selectorPrefix} .field .label span`)
	if (label) label.textContent = weekNumber
}

const setWeek = () => {
	updateWeekLabel('.inspection', inspection.dateField)
	updateWeekLabel('.inventory', inventory.dateField)
}

export const setupEventListeners = () => {
	saveInspectionBtn?.addEventListener('click', handleInspectionBtn)
	saveInventoryBtn?.addEventListener('click', handleInventoryBtn)
	fetchOptionsBtn?.addEventListener('click', handleFetchButton)

	inspection.dateField?.addEventListener('change', () =>
		updateWeekLabel('.inspection', inspection.dateField)
	)

	inventory.dateField?.addEventListener('change', () =>
		updateWeekLabel('.inventory', inventory.dateField)
	)

	document.addEventListener('DOMContentLoaded', () => {
		loadLocal()
		setTodayDate()
		setWeek()
	})
}
