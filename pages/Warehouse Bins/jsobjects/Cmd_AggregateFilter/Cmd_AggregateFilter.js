export default {
	
	refresh: (query, variables) => {
		
		let filtered = _.omit(variables,'first','offset')
		filtered = JSON.stringify(filtered)
		
		console.log(`Query : ${query}`)
		
		
		let aggregateFilterInput = Dom_AggregateFilter.aggregateFilterInput(query, filtered)
		
		return Adp_AggregateFilter.refresh(aggregateFilterInput)
		.then((res) => res.aggregateFilteredQuery.Count)
		.then((count) => Dom_Pagination.storeRecordCount(count))
		.catch((err) => {throw err})
		
	},
	
		refreshV4: () => {

		let query =  `query($filter: StockOnHandFilter!, $first: Int, $offset: Int) {
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
		
		
		
		let variables = `{
			"filter": 
				{
					"owner": {"id": "0x17"},
					"groupBy": {
						"owner": true,
						"material": true,
						"storageLocation": true,
						"status": true
					},
					"warehouse": [
					  {
          		"name": "MEL/30"
        		},
						{
							"name": "MEL/Test"
						}
					]
				}
		}`

		return queryAggregateFilter.run( {
			input:{
				query: query,
				variables: variables
			}
		})
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},
	
	refreshV5: () => {

		let query =  `query($filter: StockOnHandFilter!) {
				getStockOnHand(
					filter: $filter
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
		
		
		
		let variables = `{
			"filter": 
				{
					"owner": {"id": "0x17"},
					"groupBy": {
						"owner": true,
						"material": true,
						"storageLocation": true,
						"status": true
					},
					"warehouse": [
					  {
          		"name": "MEL/30"
        		},
						{
							"name": "MEL/Test"
						}
					]
				}
		}`

		return queryAggregateFilter.run( {
			input:{
				query: query,
				variables: variables
			}
		})
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},

}