export default {
	refresh: (serialNumbers, ownerId) => {
		return getInventoryTransactionsRaw.run({variables: {serialNumbers: serialNumbers, ownerId: ownerId}})
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
	}
}