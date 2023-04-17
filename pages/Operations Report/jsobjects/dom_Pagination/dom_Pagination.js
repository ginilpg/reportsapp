export default {
	storePageSize: (size) => storeValue("pageSize", size, false),
	storePageNo: (no) => storeValue("pageNumber", no, false),
	storeRecordCount: (count) => storeValue("recordCount", count, false),
	storePageLimit: (limit) => storeValue("pageLimit", limit, false),
	
	
	pageSize: () => appsmith.store["pageSize"],
	pageNo: () => appsmith.store["pageNumber"],
	recordCount: () => appsmith.store["recordCount"],
	pageLimit: () => appsmith.store["pageLimit"],
	
	
	
	
}