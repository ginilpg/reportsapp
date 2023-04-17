export default {
	refreshOpening: (filter) => {
		return getOpeningStockBalances.run(filter)
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},
	viewOpening: () => {
		if (getOpeningStockBalances.data == null || 
				getOpeningStockBalances.data.data.getStockOnHand == null) {
			return []
		}
		return getOpeningStockBalances.data.data.getStockOnHand
	},
	refreshClosing: (filter) => {
		return getClosingStockBalances.run(filter)
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},
	viewClosing: () => {
		if (getClosingStockBalances.data == null || 
				getClosingStockBalances.data.data.getStockOnHand == null) {
			return []
		}
		return getClosingStockBalances.data.data.getStockOnHand
	}
}