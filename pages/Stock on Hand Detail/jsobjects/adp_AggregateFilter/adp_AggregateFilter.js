export default {
	refresh: (query, variables) => {
		return queryAggregateFilter.run({query, variables}).then(res => {	
			if (!_.isEmpty(res.errors)) throw res.errors
			return res.data?.aggregateFilteredQuery?.Count
		})
	},

	view: () => queryAggregateFilter?.data?.data?.aggregateFilteredQuery?.Count,
}