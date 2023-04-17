export default {
	refresh: (filter) => {
		return getInventoryTransactionsRaw.run({
			variables:{
				filter:filter
			}
		})			
		.then(res => {	
			if (!_.isEmpty(res.errors)) { throw ( res.errors) }
			return res.data
		})
	},
	
	view: () => {
		if (getInventoryTransactionsRaw.data == null || 
				getInventoryTransactionsRaw.data.data.getInventoryTransactionsRaw == null) {
			return []
		}
		return getInventoryTransactionsRaw.data.data.getInventoryTransactionsRaw
	},
	
	test: () => {
		return appsmith.store.test()
	}
	
}