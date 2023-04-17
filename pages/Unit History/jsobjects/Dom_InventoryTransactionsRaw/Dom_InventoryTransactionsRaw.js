export default {
	refresh: (serialNumber, ownerId) => {
		return Adp_InventoryTransactionsRaw.refresh(serialNumber, ownerId)
	},
	view: () => {
		return Adp_InventoryTransactionsRaw.view()
	}
}