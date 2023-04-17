export default {

	refresh: () => {
		
	  var warehouseCodeList = []
		for(var warehouseIndex = 0; warehouseIndex < _.size(selectWarehouse.selectedOptionLabel); warehouseIndex++){
			warehouseCodeList.push({name:selectWarehouse.selectedOptionLabel[warehouseIndex]})
		}
		
		var filter = {
    	groupBy:{material:true,status:true,storageLocation:true},
    	warehouse:warehouseCodeList,
		}
		
		const warehouseNames = warehouseCodeList?.map(w => w?.name)
		const owner = selectOwner.selectedOptionValue
		
		// If the owner is provided: add to the filter
		if(!_.isEmpty(owner)){
			filter.groupBy.owner = true
			filter.owner = {id:owner}
		}
		console.log(filter)
		
		// let first = dom_Pagination.pageSize()
		// let offset = dom_Pagination.pageNo() * dom_Pagination.pageSize()
		let first = 200
		let offset = 0
		
		//let query = getStockOnHand.config.body
		// console.log(typeof getStockOnHand.config.body)
		// console.log(getStockOnHand.config.body)
		//let query = JSON.stringify(getStockOnHand.config.body)
		
		let query = `query($filter: StockOnHandFilter!, $first: Int, $offset: Int) {
			getStockOnHand(
				filter: $filter,
				first: $first,
				offset: $offset
			) {
				material { 
					code, 
					description,
					inventoryHoldingPolicy{
						inventoryMin,
						inventoryMax
					}
				}
				storageLocation{
					parent{
						name
						id
					}
				}
				status{ 
					code
				}
				quantity
			}
		}`
		
		let variables = Dom_StockOnHand.stockOnHandInput(filter, first, offset)
		
		console.log(variables)
		return Promise.all([
			Dom_Materials.refresh(owner, warehouseNames),
			Cmd_AggregateFilter.refresh(query, variables),
			Dom_StockOnHand.refresh(variables)
		])
		
		// return Cmd_AggregateFilter.refresh(query, variables)
			// .then(() => console.log(variables))
			// .then(() => Dom_StockOnHand.refresh(variables))
	},
	
}