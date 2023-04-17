export default {
	refresh: (filter, first, offset) => adp_StockOnHand.refresh(filter, first, offset),
	view: (res) => res ?? adp_StockOnHand.view(),

	buildStockOnHandFilter: (warehouses, owner) => ({
		"warehouse": warehouses?.map(warehouse => ({"name": warehouse})),
		...(owner && {"owner": {"id": owner}}),
		"groupBy": {
			"material": true,
			"status": true,
			"storageLocation": true,
			...(owner && {"owner": true}),
		},
	}),

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

	query: () => `
		query($filter: StockOnHandFilter!, $first: Int, $offset: Int) {
			getStockOnHand(filter: $filter, first: $first, offset: $offset) {
				material {
					code
					description
					materialClass {
						code
					}
					inventoryHoldingPolicy {
						inventoryMin
						inventoryMax
					}
					inventoryHandlingPolicy{
						trackBySerialNumber
					}
				}
				storageLocation {
					parent {
						id
						name
					}
				}
				status {
					code
				}
				quantity
			}
		}`.replace(/\s+/g, ' '),
}