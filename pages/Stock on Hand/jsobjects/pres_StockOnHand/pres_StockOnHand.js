export default {
	searchClick: () => {
		const warehouses = selectWarehouse.selectedOptionLabels
		const owner = selectOwner.selectedOptionValue
		return cmd_StockOnHand.refresh(warehouses, owner, undefined, true).catch(_err.showErr)
	},
	
	// Function to determine if the search button is 'enabled'
	canSearch: () => _.isEmpty(selectWarehouse.selectedOptionValues),

	view: () => {
		if (!_.isEmpty(dom_StockOnHand.view())) {
			const stock = checkShow0Materials.isChecked ? this.stockWithZeroMaterial() : dom_StockOnHand.view()
			return dom_StockOnHand.formatStockOnHand(stock)
		} else return []
	},
	
	// Adds materials with 0 quantity into stock
	stockWithZeroMaterial: () => {
		const stock = dom_StockOnHand.view()
		const notInStock = dom_Materials.likeStockOnHand().filter(material => !stock.some(s => s?.material?.code == material?.material?.code))
		return stock.concat(notInStock)
	},

	detailsClick: () => {
		return navigateTo("Stock on Hand Detail", {
			"materialCode": tblStockOnHand.triggeredRow["Material Code"],
			"owner": selectOwner.selectedOptionValue,
			"warehouse": dom_Warehouse.view().find(w => w?.label == tblStockOnHand.triggeredRow["Warehouse"])?.value,
		}, "SAME_WINDOW")
	},

	bulkExport: async () => {
		const filter = dom_StockOnHand.buildStockOnHandFilter(selectWarehouse.selectedOptionLabels, selectOwner.selectedOptionValue)
		return navigateTo("Bulk Export", {
			"pageName": "StockOnHand",
			"query": dom_StockOnHand.query(),
			"filter": JSON.stringify({"filter": filter}),
		}, "NEW_WINDOW")
	}
}