export default {

	// Handle Commands for queryOperationsRequest
	refresh_query: async () => {
		
		var opReqFilter = {}
		if(!_.isEmpty(selectOrderType.selectedOptionLabels)){
			opReqFilter.orderType = {in:selectOrderType.selectedOptionLabels}
		}

		var requestStateFilter = {}
		if(checkboxExcludeCompleted.isChecked){
			requestStateFilter.not = {name:{in:["COMPLETED", "COMPLETE"]}}
		}

		return Dom_OpReq.refresh_query(opReqFilter, requestStateFilter)
	},
	
	// Handle Commands for getOperationsRequest
	refresh_get: (code) => {
		
		let opReqCode = code ?? inpOperationsRequest.text
		return Adp_OpReq.refresh_get(opReqCode)
		.catch((err) => showAlert(JSON.stringify(err)))
	},
	
}