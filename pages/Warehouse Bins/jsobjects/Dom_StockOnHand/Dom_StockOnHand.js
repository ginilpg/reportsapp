export default {
	refresh: (payload) => {
		return Adp_StockOnHand.refresh(payload)
	},
	view: () => {
		return Adp_StockOnHand.view()
	},
	
	stockOnHandInput: (filter,first,offset) => {
		
		return {
				filter:filter,
				first: first,
				offset: offset
		}
		
	},
}