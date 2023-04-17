export default {
	view: () => {
		// Starts with opening stock.
		var formatted = Dom_Movements.formatLine(Dom_StockOnHand.viewOpening(), "Opening")			
		
		// Gets all of the unquie material uses in the movements and sorts them by receieved first, shipped last,
		// and anything else in between. Uses that sorted lists to concat sections for each type for the table.
		var materialUses = [...new Set(Dom_Transactions.view().map(item => item.materialUse))]
		materialUses.sort((i, _) => {
			if (i == "Received") return -1
			else if (i == "Shipped") return 1
			else return 0
		}).forEach(item => {
			formatted = formatted.concat(Dom_Movements.formatLine(Dom_Transactions.view().filter(i => i.materialUse == item), item))
		})
		
		formatted = formatted.concat(Dom_Movements.formatLine(Dom_StockOnHand.viewClosing(), "Closing")	)

		var final = []
		
		var materialCodes = [...new Set(formatted.map(item => item["Material Code"]))]
		
		materialCodes.forEach(item => {
			final.push(formatted.filter(fItem => item == fItem["Material Code"]))
		})
		
		return final.flat()
	},
	
	
	formatLine: (items, type) => {
		// Function for formatting lists of on hand stock to be more useful for formatting.
		return items.map(item => {
			var row = {
				"Type" : type,
				"Material Code" : item.material.code,
				"Description" : item.material.description,
				[`Status - ${item.status.code}`] : item.quantity,
			}
			
			if(appsmith.store.groupBySubLot){
			 row["SubLot"] = item.materialSubLot?.code ?? ""
			}
			
			if(appsmith.store.groupByJobResponse){
			 row["Job Response"] = item.jobResponse?.jobOrder?.segmentRequirement?.operationsRequest?.code ?? ""
			}
			
			return row
		})
	},
}