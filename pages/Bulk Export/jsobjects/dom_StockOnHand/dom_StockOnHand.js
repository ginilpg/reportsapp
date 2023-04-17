export default {
	view: () => adp_QueryGeneric.view()?.getStockOnHand ?? [],
	viewFormatted: () => this.formatStockOnHand(),

	formatStockOnHand: (res) => this.view(res)?.map(transaction => {
		const invMin = transaction.material?.inventoryHoldingPolicy?.[0]?.inventoryMin
		const invMax = transaction.material?.inventoryHoldingPolicy?.[0]?.inventoryMax

		let level
		if (invMin && invMax) {
			if (transaction?.quantity < invMin) level = "BELOW MIN"
			else if (transaction?.quantity > invMax) level = "ABOVE MAX"
		}

		return {
			"Material Code" : transaction.material.code,
			"Material Description" : transaction.material?.description,
			"Material Class" : transaction.material.materialClass?.code,
			"Warehouse" : transaction.storageLocation?.parent?.name,
			"Status" : transaction.status?.code,
			"Quantity" : transaction?.quantity,
			"Min" : invMin,
			"Max" : invMax,	
			"Level" : level,
			"Serialised" : transaction.material?.inventoryHandlingPolicy?.trackBySerialNumber ? "Yes" : "No",
		}
	}),
}