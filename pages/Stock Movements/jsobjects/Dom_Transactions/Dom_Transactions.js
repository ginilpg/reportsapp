export default {
	refresh: (filter) => {
		return Adp_Transactions.refresh(filter)
	},
	view: () => {
		return Adp_Transactions.view()
	},
	
	query: () => `query($variables: StockOnHandFilter!) {
		getStockOnHand(
			filter: $variables
		) {
			material { code, description }
			status{ code }
			materialUse
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