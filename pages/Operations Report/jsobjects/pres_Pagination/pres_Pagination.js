export default {
	setPaginationDefaults: () => {
		return Promise.all([
			dom_Pagination.storePageNo(0),
			dom_Pagination.storePageSize(tblJobOrder.pageSize),
			dom_Pagination.storeRecordCount(0),
			dom_Pagination.storePageLimit(0)
		])
	},

	changePage: () => {
		return dom_Pagination.storePageNo(tblJobOrder.pageNo - 1)
			.then(() => dom_Pagination.storePageSize(tblJobOrder.pageSize))
			.then(() => Pres_OpReq.searchClick(true))
			.catch((err) => { showAlert(JSON.stringify(err)).then(() => storeValue("isLoad",false, false) ) })
			.finally(() => storeValue("isLoad",false, false) )
	},
}