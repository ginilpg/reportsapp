export default {
	storePageSize: (size) => storeValue("pageSize", size),
	storePageNo: (no) => storeValue("pageNumber", no),
	pageSize: () => appsmith.store["pageSize"],
	pageNo: () => appsmith.store["pageNumber"],
}