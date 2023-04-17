export default {

	view: () => {
		if(!_.isEmpty(Dom_OpReq.view_query())){
			return appsmith.store.tableData
		}else{
			return []
		}
	},

	viewOpReqList: () => {
		if(_.isEmpty(Dom_OpReq.view_query())){
			//return appsmith.store.jobOrderList
		}else{
			return this.formatOpReqList()
		}
	},

	formatOpReqList: () => {
		var data = Dom_OpReq.view_query()
		var opReqList = []
		_.map(data, function(opReq){
			let customerId = opReq.customer?.id ?? "null"
			if(selectOwner.selectedOptionValues.includes(customerId) || _.isEmpty(selectOwner.selectedOptionLabels)){
				opReqList.push({"label":opReq.code,"value":opReq.code})												
			}
		})

		return opReqList
	},

	//Function to update the job orders list (when select fields change)
	updateOpReqList: () => {
		Cmd_OpReq.refresh_query()
			.then(() => {
			this.formatOpReqList()
		})
	},

	OpReqDefaultValue: () => {

		if (_.isEmpty(appsmith.URL?.queryParams?.opReq)) {
			return ""
		}

		return appsmith.URL.queryParams.opReq
		// if(!_.isEmpty(appsmith.URL.queryParams.opReq)){
		// var defaultValue = selectOpReq.options.filter((e => e.label === appsmith.URL.queryParams.opReq))
		// if(defaultValue.length > 0){
		// return {"label" : String(appsmith.URL.queryParams.opReq), "value": String(appsmith.URL.queryParams.opReq)}
		// }else{
		// return null
		// }
		// }
	},

	// canSearch: () => {
	// if(!_.isEmpty(selectOpReq.selectedOptionLabel)){
	// return false
	// }else{
	// return true
	// }
	// },

	searchButtonClicked: () => {

		//Refresh data then after that is complete, format it
		return Cmd_OpReq.refresh_get()
			.then(res => Cmd_InventoryTransactions.refresh(res))
			.catch(err => showAlert(JSON.stringify(err)))

	},

	manualInputSelected: async () => {
		const code = inpOperationsRequest.text
		const res = (await Cmd_OpReq.refresh_get(code))?.getOperationsRequest
		if (!_.isEmpty(res)) Cmd_InventoryTransactions.refresh(res)
	},

}