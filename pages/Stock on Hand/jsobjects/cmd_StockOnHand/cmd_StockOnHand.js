export default {
	refresh: (warehouses, owner, pageNo, refreshCount) => {
		const filter = dom_StockOnHand.buildStockOnHandFilter(warehouses, owner)
		const first = dom_Pagination.pageSize()
		const offset = pageNo ? pageNo * first : dom_Pagination.pageNo() * first

		if (refreshCount) dom_AggregateFilter.refresh(dom_StockOnHand.query(), JSON.stringify({"filter": filter}))
		return Promise.all([
			dom_StockOnHand.refresh(filter, first, offset),
			// dom_Materials.refresh(owner, warehouses)
		])
	},
}