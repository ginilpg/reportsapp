export default {
	refresh: (owner, warehouses) => adp_Materials.refresh(owner, warehouses),
	view: () => adp_Materials.view(),
	
	// Formats materials like stock on hand
	likeStockOnHand: () => this.view()?.map(material => {
		return {
			"quantity" : 0,
			"material" : {
				"code" : material?.code,
				"description" : material?.description,
				"materialClass" : material?.materialClass,
			},
			"storageLocation": {
				"parent" : {
					"name" : material?.inventoryHandlingPolicy?.rules?.map(r => r?.warehouse?.map(w => w?.name)).flat().join(', ')
				}
			}
		}
	}),
	
	stockOnHand: () => Dom_StockOnHand.view(),
}