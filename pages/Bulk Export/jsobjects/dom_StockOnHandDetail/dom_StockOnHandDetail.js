export default {
	view: () => adp_QueryGeneric.view()?.getStockOnHand ?? [],
	viewFormatted: () => this.formatStockOnHand(),

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
}