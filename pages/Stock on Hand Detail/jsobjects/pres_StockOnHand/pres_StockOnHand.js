export default {
	searchClick: () => {
		resetWidget("tblStockOnHand")
		const owner = selectOwner.selectedOptionValue
		const warehouse = selectWarehouse.selectedOptionLabel
		const groupBy = checkBoxAdditionalGroupBy.selectedValues
		const materials = selectMaterialCode.selectedOptionLabels
		// return dom_StockOnHand.buildStockOnHandFilter(materials, warehouse, owner, groupBy)
		return cmd_StockOnHand.refresh(materials, warehouse, owner, groupBy, 0, true).catch(_err.showErr)
	},

	// Function to determine if the search button is 'enabled'
	canSearch: () => _.isEmpty(selectWarehouse.selectedOptionValue) || _.isEmpty(selectMaterialCode.selectedOptionLabels),

	unitHistoryClick: () => {
		return navigateTo('Unit History', {
			"subLot" : tblStockOnHand.triggeredRow["SubLot"],
			"owner" : selectOwner.selectedOptionValue,
		}, 'SAME_WINDOW')
	},
	
	bulkExport: async () => {
		const owner = selectOwner.selectedOptionValue
		const warehouse = selectWarehouse.selectedOptionLabel
		const groupBy = checkBoxAdditionalGroupBy.selectedValues
		const materials = selectMaterialCode.selectedOptionLabels
		const filter = dom_StockOnHand.buildStockOnHandFilter(materials, warehouse, owner, groupBy)
		
		return navigateTo("Bulk Export", {
			"pageName": "StockOnHandDetail",
			"query": dom_StockOnHand.query(),
			"filter": JSON.stringify({"filter": filter}),
		}, "NEW_WINDOW")
	}
}