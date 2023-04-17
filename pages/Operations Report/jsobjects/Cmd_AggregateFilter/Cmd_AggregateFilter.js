export default {
	
	refresh: (variables) => {
		
		let queryFilter = _.omit(variables,'first','offset')
		queryFilter = JSON.stringify(queryFilter)
		
		let aggregateFilterInput = Dom_AggregateFilter.aggregateFilterInput(Dom_OpReq.query(), queryFilter)
		
		return Adp_AggregateFilter.refresh(aggregateFilterInput)
		.then((res) => res.aggregateFilteredQuery.Count)
		.then((count) => dom_Pagination.storeRecordCount(count))
		.then(() => dom_Pagination.storePageLimit(Math.ceil(dom_Pagination.recordCount() / dom_Pagination.pageSize())))
		.catch((err) => {throw err})
		
		

		
	},

}