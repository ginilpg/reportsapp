export default {
	refresh: (filter, first, offset) => {
		return getStockOnHand.run({filter, first, offset}).then(res => {	
			if (!_.isEmpty(res.errors)) throw res.errors
			return res?.data?.getStockOnHand
		})
	},
	
	view: () => getStockOnHand?.data?.data?.getStockOnHand,
}