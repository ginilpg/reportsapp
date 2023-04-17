export default {
	
	refresh: (variables) => {

		let filtered = _.omit(variables,'first','offset')
		filtered = JSON.stringify(filtered)
		
		let query = `query($filter: StockOnHandFilter!, $first:Int, $offset:Int) {
				getStockOnHand(filter: $filter, first: $first, offset: $offset) {
					material {
						code
						description
						materialClass {
							code
						}
						inventoryHoldingPolicy {
							inventoryMin
							inventoryMax
						}
						inventoryHandlingPolicy {
							trackBySerialNumber
						}
					}
					status {
						code
					}
					quantity
					storageLocation {
						name
					}
					carrier {
						code
					}
					materialSubLot {
						code
					}
				}
			}`
		
		let aggregateFilterInput = Dom_AggregateFilter.aggregateFilterInput(query, filtered)
		
		return Adp_AggregateFilter.refresh(aggregateFilterInput)
		.then((res) => res.aggregateFilteredQuery.Count)
		.then((count) => Dom_Pagination.storeRecordCount(count))
		.catch((err) => {throw err})

	},

}