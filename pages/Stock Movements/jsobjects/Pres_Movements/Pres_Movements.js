export default {
	refresh: () => {
		// Collecting inputs.
		//let payload = this.getSearchFilters()
		
		return storeValue('isLoad', true)
		.then(() => this.getSearchFilters())
		.then((payload) => Cmd_Movements.refresh(payload))
		.then(() => storeValue('isLoad', false))
		.catch(_err.showErr())
	},
	
	getSearchFilters: () => {
		return {
			from : dateFrom.selectedDate,
		 	to : dateTo.selectedDate,
		 	owner : selectOwner.selectedOptionValue,
		 	materials : selectMaterials.selectedOptionValues,
		 	warehouse : selectWarehouse.selectedOptionLabel,
			groupBySubLot : checkBoxGroupBySubLot.isChecked,
			groupByJobResponse : checkBoxGroupByJobResponse.isChecked,
		}
		
		
	},
	
	
	
	
	testFilter: () => {
		return Cmd_Movements.buildFilter("2022-10-03T00:00:00Z", "2022-11-03T00:00:00Z", "", ["100250054", "100250055", "100245833R"], "MEL/30", true)
	},
}