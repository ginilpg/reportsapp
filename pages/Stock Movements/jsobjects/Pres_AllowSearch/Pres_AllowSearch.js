export default {
	canSearch: () => {
		return (_.isEmpty(selectWarehouse.selectedOptionValue) || _.isEmpty(dateFrom.selectedDate) || _.isEmpty(dateTo.selectedDate))
	}
}