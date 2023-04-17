export default {
	refresh: (materials, warehouse, owner, groupBy, pageNo, refreshCount) => {
		const filter = dom_StockOnHand.buildStockOnHandFilter(materials, warehouse, owner, groupBy)
		const first = dom_Pagination.pageSize()
		const offset = pageNo * first

		if (refreshCount) dom_AggregateFilter.refresh(dom_StockOnHand.query(), JSON.stringify({"filter": filter}))
		return dom_StockOnHand.refresh(filter, first, offset)
	},
}