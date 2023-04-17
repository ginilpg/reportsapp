export default {
	refresh: (warehouseId) => {
		return Adp_WarehouseBins.refresh(warehouseId)
	},
	view: () => {
		return Adp_WarehouseBins.view()
	}
}