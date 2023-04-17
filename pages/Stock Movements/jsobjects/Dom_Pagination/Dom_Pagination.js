export default {
	storePageSize: (size) => storeValue("pageSize", size, false),
	storePageNo: (no) => storeValue("pageNumber", no, false),
	storeRecordCount: (count) => storeValue("recordCount", count, false),
	storeQueryFilters: (filter) => storeValue("queryFilter", filter, false),
	
	pageSize: () => appsmith.store["pageSize"],
	pageNo: () => appsmith.store["pageNumber"],
	recordCount: () => appsmith.store["recordCount"],
	queryFilter: () => appsmith.store["queryFilter"],
}

