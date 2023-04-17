export default {

	refresh: async (jobResponseID) => {
		var filter = {
			jobResponse:{id:jobResponseID},
		}
		
		return Dom_InventoryTransactions.refresh(filter)
	},
	
}