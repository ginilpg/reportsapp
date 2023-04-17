export default {
	changePage: () => {
		const owner = selectOwner.selectedOptionValue
		const warehouse = selectWarehouse.selectedOptionLabel
		const groupBy = checkBoxAdditionalGroupBy.selectedValues
		const materials = selectMaterialCode.selectedOptionLabels
		return cmd_StockOnHand.refresh(materials, warehouse, owner, groupBy, tblStockOnHand.pageNo - 1, false).catch(_err.showErr)
	},
}