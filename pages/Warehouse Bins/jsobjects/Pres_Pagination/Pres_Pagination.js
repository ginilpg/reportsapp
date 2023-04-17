export default {
	setPaginationDefaults: () => {
		return Dom_Pagination.storePageNo(0)
		.then(() => Dom_Pagination.storePageSize(tblStockOnHand.pageSize))
		.then(() => Dom_Pagination.storeRecordCount(0))
	},
	
	changePage: () => {
		return // Blocking this until StockOnHand pagination actually works
		return Dom_Pagination.storePageNo(tblStockOnHand.pageNo - 1)
		.then(() => Dom_Pagination.storePageSize(tblStockOnHand.pageSize))
		.then(() => Cmd_StockOnHand.refresh() )
		.catch((e) => showAlert(JSON.stringify(e)))
		
	},
}