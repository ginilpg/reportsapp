export default {
	refreshOpening: (filter) => {
		return Adp_StockOnHand.refreshOpening(filter)
	},
	viewOpening: () => {
		return Adp_StockOnHand.viewOpening()
	},
	refreshClosing: (filter) => {
		return Adp_StockOnHand.refreshClosing(filter)
	},
	viewClosing: () => {
		return Adp_StockOnHand.viewClosing()
	},
	
	
	query: () => `query($variables: StockOnHandFilter!) {
		getStockOnHand(
			filter: $variables
		) {
			material { code, description }
			status{ code }
			quantity
			materialSubLot{
				code
			}
			jobResponse{
				jobOrder{
					segmentRequirement{
						operationsRequest{
							code
						}
					}
				}
			}
		}
	}`.replace(/\s+/g, ' '),
	
}