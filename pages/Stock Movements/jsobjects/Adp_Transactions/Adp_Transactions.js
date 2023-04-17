export default {
	refresh: (filter) => {
		return getTransactions.run(filter)
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},
	view: () => {
		if (getTransactions.data == null || 
				getTransactions.data.data.getStockOnHand == null) {
			return []
		}
		return getTransactions.data.data.getStockOnHand
	}
}