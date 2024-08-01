import { loadLocal, setTodayDate, setWeek, updateWeekLabel } from '@utils/ui'
import { elements } from './elements'
import { handleFetchButton, handleInspectionBtn, handleInventoryBtn } from './handlers'

export const setupEventListeners = () => {
	elements.saveInspectionBtn?.addEventListener('click', handleInspectionBtn)
	elements.saveInventoryBtn?.addEventListener('click', handleInventoryBtn)
	elements.fetchOptionsBtn?.addEventListener('click', handleFetchButton)

	elements.inspection.dateField?.addEventListener('change', () =>
		updateWeekLabel('.inspection', elements.inspection.dateField)
	)

	elements.inventory.dateField?.addEventListener('change', () =>
		updateWeekLabel('.inventory', elements.inventory.dateField)
	)

	document.addEventListener('DOMContentLoaded', () => {
		loadLocal()
		setTodayDate()
		setWeek()
	})
}
