import { decryptData, encryptData } from './encryption'
import { parseHex } from './lib'
import { fetchData, saveRecord } from './service'
import { SelectData } from './types'

const saveBtn = document.querySelector('.save-data') as HTMLButtonElement
const fetchBtn = document.querySelector('.fetch-data') as HTMLButtonElement
const statusCodeLabel = document.querySelector('.status-code span') as HTMLSpanElement

const inspectorField = document.querySelector(`.property[name='inspector']`) as HTMLSelectElement
const productField = document.querySelector(`.property[name='product']`) as HTMLSelectElement
const problemTypeField = document.querySelector(
	`.property[name='problemType']`
) as HTMLSelectElement
const problemField = document.querySelector(`.property[name='problem']`) as HTMLSelectElement

const handleSaveClick = async () => {
	try {
		const data = JSON.stringify({
			inspector: inspectorField.value,
			problem: problemField.value,
			problemType: problemTypeField.value,
			product: productField.value,
		})
		const encryptedData = encryptData(data)

		const status = await saveRecord({ encrypted: encryptedData })
		statusCodeLabel.innerHTML = `${status}`
		statusCodeLabel.style.color = status == 201 ? 'green' : 'red'
	} catch (error) {
		console.error('Error saving data:', error)
	}
}

const addOptionsToFields = (data: SelectData) => {
	clearFields()
	addOptionsToField(inspectorField, data.inspectors)
	addOptionsToField(problemField, data.problems)
	addOptionsToField(problemTypeField, data.problemTypes)
	addOptionsToField(productField, data.products)
}

const clearFields = () => {
	const blankOption = '<option value="">None</option>'
	inspectorField.innerHTML = blankOption
	problemField.innerHTML = blankOption
	problemTypeField.innerHTML = blankOption
	productField.innerHTML = blankOption
}

const loadFromLocalStorage = () => {
	const data = localStorage.getItem('data')
	if (data) addOptionsToFields(JSON.parse(data))
}

const handleFetchClick = async () => {
	try {
		const data = await fetchData()
		const decryptedData = decryptAndParseData(data) as SelectData

		addOptionsToFields(decryptedData)
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}

const decryptAndParseData = (data: string) => {
	try {
		const [ivHex, encrypted] = data.split(':')
		const iv = parseHex(ivHex)
		const decryptedString = decryptData(encrypted, iv)

		localStorage.setItem('data', decryptedString)

		return JSON.parse(decryptedString) as SelectData
	} catch (error) {
		if (error instanceof Error) throw new Error('Error decrypting data: ' + error.message)
	}
}

const addOptionsToField = (field: HTMLSelectElement, values: string[]) => {
	values.forEach(value => {
		const newOption = document.createElement('option')
		newOption.innerHTML = value
		newOption.value = value
		field.appendChild(newOption)
	})
}

export const setupEventListeners = () => {
	saveBtn?.addEventListener('click', handleSaveClick)
	fetchBtn?.addEventListener('click', handleFetchClick)
	document.addEventListener('DOMContentLoaded', loadFromLocalStorage)
}
