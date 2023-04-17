export default {
	onPageLoad: () => {
		return Promise.all([
			dom_Warehouse.refresh(),
			dom_Owner.refresh(),
			dom_Pagination.storePageSize(tblStockOnHand.pageSize),
		]).then(() => Promise.all([
			pres_Material.refresh(),
			this.autoLoad(),
		])).catch(_err.showErr)
	},

	// Automatically searches stock if queryParam is set
	autoLoad: () => {
		if (!appsmith.URL?.queryParams?.materialCode) return
		
		const materials = [appsmith.URL?.queryParams?.materialCode]
		const owner = selectOwner.selectedOptionValue
		const warehouse = selectWarehouse.selectedOptionLabel
		const groupBy = checkBoxAdditionalGroupBy.selectedValues
		return cmd_StockOnHand.refresh(materials, warehouse, owner, groupBy, 0, true).catch(_err.showErr)
	},
}


