export default {

	view: () => {
		if(!_.isEmpty(Dom_OpReq.view())){
			return appsmith.store.tableData
		}else{
			return []
		}
	},
	
	viewJobOrderList: () => {
		if(_.isEmpty(Dom_OpReq.view())){
			return appsmith.store.jobOrderList
		}else{
			return this.formatJobOrderList()
		}
	},
	
	formatJobOrderList: () => {
		var data = Dom_OpReq.view()
		var jobOrderList = []
		_.map(data, function(opReq){
			for (let segReqIndex = 0; segReqIndex < _.size(opReq.segmentRequirements); segReqIndex++) {
				var segReq = opReq.segmentRequirements[segReqIndex]
				
				for (let jobOrderIndex = 0; jobOrderIndex < _.size(segReq.jobOrders); jobOrderIndex++) {
					var jobOrder = segReq.jobOrders[jobOrderIndex]	
					var jobOrderEquipment = (!_.isEmpty(jobOrder.equipment?.name) ? jobOrder.equipment?.name : "Not yet in Warehouse")

					if(selectWarehouse.selectedOptionLabels.includes(jobOrderEquipment) || _.isEmpty(selectWarehouse.selectedOptionLabels)){
						jobOrderList.push({"label":jobOrder.name,"value":jobOrder.name})												
					}
				}
			}
		})
		
		return jobOrderList
	},
	
	//Function to update the job orders list (when select fields change)
	updateJobOrderList: () => {
		Cmd_OpReq.refresh()
		.then(() => {
			this.formatJobOrderList()
		})
	},
	
	jobOrderDefaultValue: () => {
		if(!_.isEmpty(appsmith.URL.queryParams.jobOrder)){
			var defaultValue = selectJobOrder.options.filter((e => e.label === appsmith.URL.queryParams.jobOrder))
			if(defaultValue.length > 0){
				return {"label" : String(appsmith.URL.queryParams.jobOrder), "value": String(appsmith.URL.queryParams.jobOrder)}
			}else{
				return null
			}
		}
	},
	
	canSearch: () => {
		if(!_.isEmpty(selectJobOrder.selectedOptionLabel)){
			return false
		}else{
			return true
		}
	},
	
	searchButtonClicked: async () => {
		
		//Refresh data then after that is complete, format it
		await Cmd_JobOrder.refresh()
		Pres_JobOrder.refreshStockOnHand()
	}

}