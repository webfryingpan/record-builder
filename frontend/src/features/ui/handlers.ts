import { Options, Timeout } from '@/types'
import saveBoardInspection from '@services/inspection'
import saveBoardInventory from '@services/inventory'
import fetchOptions from '@services/options'
import { getWeekNumber } from '@utils/date'
import { handleUIError } from '@utils/errorHandlers'
import { fillFields } from '@utils/ui'
import { elements } from './elements'

let timeout: Timeout

export const handleInspectionBtn = async () => {
	if (
		elements.inspection.dateField &&
		elements.inspection.inspectorField &&
		elements.inspection.boardField &&
		elements.inspection.problemTypeField &&
		elements.inspection.problemField &&
		elements.workerInput
	) {
		const date = new Date(elements.inspection.dateField.value)
		try {
			const { status } = await saveBoardInspection(
				{
					date,
					week: getWeekNumber(date),
					inspectorName: elements.inspection.inspectorField.value,
					board: elements.inspection.boardField.value,
					problemType: elements.inspection.problemTypeField.value,
					problemDescription: elements.inspection.problemField.value,
				},
				+elements.workerInput.value
			)
			updateStatusLabel(status)
		} catch (error) {
			handleUIError(error, 'Error saving board inspection:')
		}
	}
}

export const handleInventoryBtn = async () => {
	if (
		elements.inventory.dateField &&
		elements.inventory.boardField &&
		elements.inventory.quantityField &&
		elements.workerInput
	) {
		const date = new Date(elements.inventory.dateField.value)
		try {
			const { status } = await saveBoardInventory(
				{
					date,
					week: getWeekNumber(date),
					board: elements.inventory.boardField.value,
					quantity: +elements.inventory.quantityField.value,
				},
				+elements.workerInput.value
			)
			updateStatusLabel(status)
		} catch (error) {
			handleUIError(error, 'Error saving board inventory:')
		}
	}
}

export const handleFetchButton = async () => {
	try {
		const { data, status } = await fetchOptions()
		if (!data) throw new Error('Unexpected error')
		fillFields(data as Options)
		localStorage.setItem('data', JSON.stringify(data))
		updateStatusLabel(status)
	} catch (error) {
		handleUIError(error, 'Error fetching options:')
	}
}

export const updateStatusLabel = (status: number) => {
	if (!elements.statusCodeLabel) return
	elements.statusCodeLabel.style.visibility = 'visible'
	elements.statusCodeLabel.textContent = status.toString()
	elements.statusCodeLabel.style.color = status === 201 || status === 200 ? 'green' : 'red'
	if (timeout) clearTimeout(timeout)
	timeout = setTimeout(() => {
		if (!elements.statusCodeLabel) return
		elements.statusCodeLabel.style.visibility = 'hidden'
	}, 5000)
}
