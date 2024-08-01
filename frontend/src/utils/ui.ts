import { Options } from '@/types'
import { elements } from '@features/ui/elements'
import { getWeekNumber } from '@utils/date'

export const setOptions = (field: HTMLSelectElement | null, values: string[]) => {
	if (!field) return
	field.innerHTML = '<option value="">None</option>'
	values.forEach(value => {
		const option = document.createElement('option')
		option.value = value
		option.textContent = value
		field.appendChild(option)
	})
}

export const updateWeekLabel = (selectorPrefix: string, dateField: HTMLInputElement | null) => {
	if (!dateField) return
	const weekNumber = getWeekNumber(new Date(dateField.value)).toString()
	const label = document.querySelector<HTMLSpanElement>(`${selectorPrefix} .field .label span`)
	if (label) label.textContent = weekNumber
}

export const fillFields = (data: Options) => {
	setOptions(elements.inspection.inspectorField, data.inspectors)
	setOptions(elements.inspection.boardField, data.boards)
	setOptions(elements.inspection.problemField, data.problems)
	setOptions(elements.inspection.problemTypeField, data.problemTypes)
	setOptions(elements.inventory.boardField, data.boards)
}

export const loadLocal = () => {
	const data = localStorage.getItem('data')
	if (data) fillFields(JSON.parse(data))
}

export const setTodayDate = () => {
	const today = new Date().toISOString().split('T')[0]
	if (elements.inspection.dateField) elements.inspection.dateField.value = today
	if (elements.inventory.dateField) elements.inventory.dateField.value = today
}

export const setWeek = () => {
	updateWeekLabel('.inspection', elements.inspection.dateField)
	updateWeekLabel('.inventory', elements.inventory.dateField)
}
