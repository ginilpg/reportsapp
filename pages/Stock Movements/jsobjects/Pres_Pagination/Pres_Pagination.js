export default {
	setPaginationDefaults: () => {
		return Promise.all([
			Dom_Pagination.storePageNo(0),
			Dom_Pagination.storePageSize(tblStockMovements.pageSize),
			Dom_Pagination.storeRecordCount(0),
		])
	},

	// changePage: () => {
		// return storeValue("isLoad", true)
			// .then(() => Dom_Pagination.storePageNo(tblStockMovements.pageNo - 1))
			// .then(() => Dom_Pagination.storePageSize(tblStockMovements.pageSize))
			// .then(() => Cmd_StockOnHand.refresh(false, selectOwner.selectedOptionValue, selectWarehouse.selectedOptionLabel ) )
			// .then(() => Pres_StockOnHand.formatTable(Dom_StockOnHand.view()))
			// .then(() => storeValue("isLoad",false))
			// .catch(_err.showErr)
	// },
}