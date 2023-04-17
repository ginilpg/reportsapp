export default {

	refresh: () => {
		return Cmd_StockOnHand.refresh().catch(_err.showErr)
	},

	// Function to determine if the search button is 'enabled'
	canSearch: () => {
		return (_.isEmpty(selectWarehouse.selectedOptionValues))
	},

	view: () => {
		if(!_.isEmpty(Dom_StockOnHand.view())){
			const stock = checkShow0Materials.isChecked ? this.stockWithZeroMaterial() : Dom_StockOnHand.view()
			return this.formatLine(stock)
		}else{
			return []
		}
	},
	 
	stockWithZeroMaterial: () => {
		const stock = Dom_StockOnHand.view()
		const notInStock = Dom_Materials.likeStockOnHand().filter(material => !stock.some(s => s?.material?.code == material?.material?.code))
		return stock.concat(notInStock)
	},

	formatLine: (items) => {
		// Function for formatting lists of on hand stock to be more useful for formatting.

		return items.map(item => {
			var inventoryMin = ""
			var inventoryMax = ""
			var levelDescription = ""
			var warehouse = item.storageLocation?.parent?.name ?? ""

			if(!_.isEmpty(item.material.inventoryHoldingPolicy)){
				inventoryMin = item.material.inventoryHoldingPolicy[0].inventoryMin
				inventoryMax = item.material.inventoryHoldingPolicy[0].inventoryMax
			}

			// Formatting 'level description' column
			if(inventoryMin != "" && inventoryMax != ""){
				if(item.quantity < inventoryMin){
					levelDescription = "BELOW MIN"
				}
				if(item.quantity > inventoryMax){
					levelDescription = "ABOVE MAX"
				}
			}

			return {
				"Material Code" : item.material.code,
				"Material Description" : item.material.description,
				"Material Class" : item.material.materialClass?.code,
				"Warehouse" : warehouse,
				"Status" : item.status?.code ?? "",
				"Quantity" : item.quantity,
				"Min" : inventoryMin,
				"Max" : inventoryMax,	
				"Level Description" : levelDescription,
			}
		})
	},

	detailsClick: () => {

		//Format materialsList with material codes from stock on hand view
		var data = Dom_StockOnHand.view()
		var addedMaterials = []
		var materialsList = []
		_.map(data, function(stock){
			console.log(stock)
			if(!_.includes(addedMaterials, stock.material.code)){
				materialsList.push({"material" : {"code" :stock.material.code}})
				addedMaterials.push(stock.material.code)
			}
		});

		var warehouseFilter = null
		var warehouseData = Dom_Warehouse.view()
		for(var warehouseIndex = 0; warehouseIndex < _.size(warehouseData); warehouseIndex++){
			if(warehouseData[warehouseIndex].label == tblStockOnHand.triggeredRow["Warehouse"]){
				warehouseFilter = warehouseData[warehouseIndex]
			}
		}

		//Store material codes list
		storeValue("materialsList", materialsList)

		//Navigate to Unit Histroy page
		navigateTo('Stock on Hand Detail',{
			materialCode:tblStockOnHand.triggeredRow["Material Code"], 
			warehouse:warehouseFilter.value,
			owner:selectOwner.selectedOptionValue,
		}, 'SAME_WINDOW')
	}

}