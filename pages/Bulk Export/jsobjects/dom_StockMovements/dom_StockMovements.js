export default {
	viewOpening: () => appsmith.store["bulkExport/res"][0].getStockOnHand ?? [],
	viewClosing: () => appsmith.store["bulkExport/res"][1].getStockOnHand ?? [], 
	viewTransactions: () => appsmith.store["bulkExport/res"][2].getStockOnHand ?? [],
	viewFormatted: () => this.formatMovements(),
	
	formatMovements: () => {
		// Starts with opening stock.
		var formatted = this.formatLine(dom_StockMovements.viewOpening(), "Opening")
		
		var materialUses = [...new Set(dom_StockMovements.viewTransactions().map(item => item.materialUse))]
		materialUses.sort((i, _) => {
			if (i == "Received") return -1
			else if (i == "Shipped") return 1
			else return 0
		}).forEach(item => {
			formatted = formatted.concat(this.formatLine(dom_StockMovements.viewTransactions().filter(i => i.materialUse == item), item))
		})
		
		formatted = formatted.concat(this.formatLine(dom_StockMovements.viewClosing(), "Closing")	)

		const final = []
		
		const materialCodes = [...new Set(formatted.map(item => item["Material Code"]))]
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
			return row
		})
	},
	
	
}