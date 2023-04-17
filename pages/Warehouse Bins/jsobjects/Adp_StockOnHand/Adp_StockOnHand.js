export default {
	refresh: (payload) => {
		return getStockOnHand.run({variables: payload})			
		.then(res => {	
			if (!_.isEmpty(res.errors)) { throw ( res.errors) }
			return res.data
		})
	},
	view: () => {
		if (getStockOnHand.data == null || 
				getStockOnHand.data.data.getStockOnHand == null) {
			return []
		}
		return getStockOnHand.data.data.getStockOnHand
	}
	
}