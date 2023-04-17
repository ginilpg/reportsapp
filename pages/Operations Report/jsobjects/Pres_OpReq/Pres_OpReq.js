export default {

	view: () => {
		return appsmith.store?.tableData ?? []
	},
	
	getSearchFilters: () => {
		return {
			selectedOrderTypes: selectOrderType.selectedOptionLabels, 
			opReqCode: inpOpReqCode.text, 
			owner: selectOwner.selectedOptionLabels, 
			attention: inpAttention.text, 
			dateFrom: datePickerFrom.selectedDate, 
			dateTo: datePickerTo.selectedDate, 
			excludeCompleted: checkboxExcludeCompleted.isChecked, 
			selectedRequestStates: sltRequestState.selectedOptionLabels, 
			warehouses: selectWarehouse.selectedOptionLabels,
			excludeInWarehouse: checkBoxWarehouse.isChecked, 
			selectedPropNames: selectPropertyName.selectedOptionLabels, 
			selectedPropValues: selectPropertyValue.selectedOptionLabels
		}
	},

	// Fucntion when the user clicks the search button (refresh data then format data)
	searchClick: (calledFromChangePage = false) => {
		return storeValue("isLoad",true,false)
			.then(() => { if (!calledFromChangePage) { return pres_Pagination.setPaginationDefaults(calledFromChangePage) } })
			.then(() => { if (!calledFromChangePage) { resetWidget('tblJobOrder') } })
			.then(() => {
				let res = Pres_OpReq.getSearchFilters()
				return res
			})
			.then((selectedFilterInputs) => Cmd_OpReq.refresh(selectedFilterInputs, calledFromChangePage) )
			.then((res) => Dom_OpReq.formatLine(res) ) 
			.then((tableData) => storeValue("tableData", tableData, false))
			.catch((err) => { showAlert(JSON.stringify(err)).then(() => storeValue("isLoad",false,false) ) })
			.finally(() => storeValue("isLoad",false,false) )
	},
	
	//Navigate to Unit Histroy page
	detailClick:() => {
		var warehouseFilter = selectWarehouse.selectedOptionValues.join(',')
		var ownerFilter = selectOwner.selectedOptionValues.join(',')
		var orderTypeFilter = selectOrderType.selectedOptionLabels.join(',')

		navigateTo('Operations Report Detail',{
			warehouse:warehouseFilter, 
			owner:ownerFilter,
			orderType:orderTypeFilter,
			opReq:tblJobOrder.triggeredRow["Operations Request"],
		}, 'SAME_WINDOW')
	},


	propertiesVisible: () => {
		var visible = false
		if(appsmith.store.filterByProperties == true){
			visible = true
		}	
		return visible
	},

	formatDateTime: (dateTime) => {
		if(!_.isEmpty(dateTime)){
			return moment(dateTime).format('YYYY/MM/DD, H:mm:ss.SSS')
		}else{
			return ""
		}
	},










}
