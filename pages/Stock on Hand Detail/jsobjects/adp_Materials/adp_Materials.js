export default {
	refresh: (filter) => {
		return getMaterials.run({filter}).then(res => {	
			if (!_.isEmpty(res.errors)) throw res.errors
			return res?.data?.getStockOnHand
		})
	},
	
	view: () =>  getMaterials?.data?.data?.getStockOnHand,
}