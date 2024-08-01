export const getWeekNumber = (date: Date): number => {
	const currentDay = Math.ceil(
		(date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (1000 * 24 * 60 * 60)
	)

	return Math.trunc((currentDay - 1) / 7 + 1)
}
