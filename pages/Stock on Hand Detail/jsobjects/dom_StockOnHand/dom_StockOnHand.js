export default {
	refresh: (filter, first, offset) => adp_StockOnHand.refresh(filter, first, offset),
	view: (res) => res ?? adp_StockOnHand.view(),

	buildStockOnHandFilter: (materials, warehouse, owner, groupBy) => ({
		"material": materials?.map(m => ({"code": m})),
		...(warehouse && {"warehouse": {"name": warehouse}}),
		...(owner && {"owner": {"id": owner}}),
		"groupBy": {
			"material": true,
			"status": true,
			"warehouse": !groupBy?.includes("storageLocation"),
			...(owner && {"owner": true}),
			...groupBy?.reduce((acc, g) => ({...acc, [g]: true}), {}),
		}
	}),

	formatStockOnHand: (res) => this.view(res)?.map(transaction => { 
		return {
			"Material Code" : transaction.material?.code,
			"Material Description" : transaction.material?.description,
			"Material Class" : transaction.material.materialClass?.code,
			"Status" : transaction?.status?.code,
			"Quantity" : transaction?.quantity,
			"Storage Location" : transaction?.storageLocation?.name,
			"Carrier" : transaction?.carrier?.code,
			"SubLot" : transaction?.materialSubLot?.code,
			"Serialised" : transaction?.materialSubLot?.code ? undefined : (transaction.material?.inventoryHandlingPolicy?.trackBySerialNumber ? "Yes" : "No"),
		}
	}) ?? [],

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
					inventoryHandlingPolicy {
						trackBySerialNumber
					}
				}
				status {
					code
				}
				quantity
				storageLocation {
					name
				}
				carrier {
					code
				}
				materialSubLot {
					code
				}
			}
		}`.replace(/\s+/g, ' '),
}