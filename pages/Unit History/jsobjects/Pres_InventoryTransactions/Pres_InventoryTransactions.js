export default {

	view: () => {
		// Formats raw inventory transaction data to be used in table
		return Dom_InventoryTransactionsRaw.view()
			// Filters out unwanted transactions
			.filter((item) => {
			
				if (!_.isEmpty(item.shipment)) return item
				
				if (item.materialUse == "Consumed") return item
				//if (item.materialUse == "Produced") return item
		
				return item.quantity > 0 || !_.isEmpty(item.shipment)
			
			})
			// Changes nulls to empty strings in object (for table formatting)
			.map((item) => {
				for (var key in item) {
					if (item[key] == null) { item[key] = "" }
				}
				return item
			})
			// Sorts entries by date (first in list is latest date)
			.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
	}
}