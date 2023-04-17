export default {
	setPaginationDefaults: () => {
		return Promise.all([
			dom_Pagination.storePageNo(0),
			dom_Pagination.storePageSize(tblStockOnHand.pageSize),
		])
	},
	
	changePage: () => {
		return Promise.all([
			dom_Pagination.storePageNo(tblStockOnHand.pageNo - 1),
			dom_Pagination.storePageSize(tblStockOnHand.pageSize),
			cmd_StockOnHand.refresh(selectWarehouse.selectedOptionLabels, selectOwner.selectedOptionValue, tblStockOnHand.pageNo - 1, false)
		])
	},
}