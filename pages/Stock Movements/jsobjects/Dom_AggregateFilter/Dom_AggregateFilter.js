export default {
	
	refresh: (payload) => {
		return Adp_AggregateFilter.refresh(payload)
	},
	view: () => {
		return Adp_AggregateFilter.view()
	},
	
	
	
	aggregateFilterInput: (query, variables) => {
		return {
			input: {
				"query": query,
				"variables": variables
			}
		}
	},
	


}