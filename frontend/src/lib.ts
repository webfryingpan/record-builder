export const getWeekNumber = (date: Date): number => {
	const startDate = new Date(date.getFullYear(), 0, 1)
	const days = Math.floor((date.getTime() - startDate.getTime()) / (60 * 60 * 24 * 1000))
	const weekNumber = Math.floor((date.getDay() + 1 + days) / 7)
	return weekNumber
}
