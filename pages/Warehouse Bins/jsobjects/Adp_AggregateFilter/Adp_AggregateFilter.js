export default {
	refresh: (payload) => {
		return queryAggregateFilter.run( payload )
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},


	
	
	
	view: () => {
		if (queryAggregateFilter.data == null ) {
			return []
		}
		return queryAggregateFilter.data.data.aggregateFilteredQuery.Count
	}
}