export default {
	refresh: () => {
		const owner = selectOwner.selectedOptionValue
		const warehouse = selectWarehouse.selectedOptionLabel
		if (!warehouse) return
		return cmd_Materials.refresh(warehouse, owner).catch(_err.showErr)
	},		
}