export default {
	exportClicked: async () => {
		const { from, to, owner, materials, warehouse, groupBySubLot, groupByJobResponse } = Pres_Movements.getSearchFilters()
		const openingFilter = Cmd_Movements.buildFilter(null, from, owner, materials, warehouse, false, groupBySubLot, groupByJobResponse)
		const closingFilter = Cmd_Movements.buildFilter(null, to, owner, materials, warehouse, false, groupBySubLot, groupByJobResponse) 
		const transactionFilter = Cmd_Movements.buildFilter(from, to, owner, materials, warehouse, true, groupBySubLot, groupByJobResponse)

		const payload = [
			{ "query": Dom_StockOnHand.query(), "filter": JSON.stringify(openingFilter) },
			{ "query": Dom_StockOnHand.query(), "filter": JSON.stringify(closingFilter) }, 
			{ "query": Dom_Transactions.query(), "filter": JSON.stringify(transactionFilter) }
		]

		await storeValue("bulkExport/payload", payload, true)

		navigateTo('Bulk Export', {
			"pageName": "StockMovements",
		},'NEW_WINDOW')
	},
}