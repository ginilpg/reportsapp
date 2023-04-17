export default {

	view: () => {
		if(!_.isEmpty(Dom_JobOrder.view())){
			return appsmith.store.tableData
		}else{
			return []
		}
	},
	
	// Function to format data into format readable by the table
	formatLine: () => {
		
		var data = Dom_JobOrder.view()
		var tableData = []
		
		_.map(data, function(opReq){
			var opReqCode = (!_.isEmpty(opReq.code) ? opReq.code : "")
			var orderType = (!_.isEmpty(opReq.orderType) ? opReq.orderType : "")

			var ownerName = ""
			if(!_.isEmpty(opReq.customer)){
				ownerName = (!_.isEmpty(opReq.customer.name) ? opReq.customer.name : "")
			}
			for (let segReqIndex = 0; segReqIndex < _.size(opReq.segmentRequirements); segReqIndex++) {
				var segReq = opReq.segmentRequirements[segReqIndex]
				var segReqCode = (!_.isEmpty(segReq.code) ? segReq.code : "")
				
				for (let jobOrderIndex = 0; jobOrderIndex < _.size(segReq.jobOrders); jobOrderIndex++) {
					var jobOrder = segReq.jobOrders[jobOrderIndex]
					var jobOrderEquipment = (!_.isEmpty(jobOrder.equipment?.name) ? jobOrder.equipment?.name : "Not yet in Warehouse")
					var dispatchStatus = jobOrder.dispatchStatus
					
					// If equipment name is in warehouse list || if the user hasn't selected any warehouses
					if(selectWarehouse.selectedOptionLabels.includes(jobOrderEquipment) || _.isEmpty(selectWarehouse.selectedOptionLabels)){
						var createdDateTime =  jobOrder.createdDateTime
						var startDateTime = ""
						var endDateTime = ""
						var durationDateTime = null

						for (let jobOrderResponseIndex = 0; jobOrderResponseIndex < _.size(jobOrder.jobResponses); jobOrderResponseIndex++) {
							var jobResponse = jobOrder.jobResponses[jobOrderResponseIndex]	
							startDateTime = jobResponse.startDateTime
							endDateTime = jobResponse.endDateTime

							// If both start and end dates exist, find the duration
							if(!_.isEmpty(startDateTime)  && !_.isEmpty(endDateTime)){
								var diff = moment.duration(moment(endDateTime).diff(moment(startDateTime)));
								var days = diff.days()
								var hours = diff.hours()
								var minutes = diff.minutes()
								var seconds = diff.seconds()
								if(days != 0){
									hours = hours + (24 * days)
								}
								durationDateTime = hours + "h " + minutes + "m " + seconds +"s "
								
							}

						}

						tableData.push({
							"Operations Request" : opReqCode,
							"Segment Requirement" : segReqCode,
							"Job Order" : jobOrder.name,
							"Order Type" : orderType, 
							"Dispatch Status" : dispatchStatus,
							"Warehouse" : jobOrderEquipment,
							"Owner" : ownerName,
							"Created" : createdDateTime,
							"Activated" : startDateTime,
							"Completed" : endDateTime,
							"Duration" : durationDateTime
						})					
					}					
				}
			}
		})

		return tableData
	},
	
	// Fucntion when the user clicks the search button (refresh data then format data)
	searchClick:() => {
		Cmd_JobOrder.refresh().then(() => {
			var tableData = this.formatLine()
			storeValue("tableData", tableData, false)
		})
	},
	
	//Navigate to Unit Histroy page
	detailClick:() => {
		var warehouseFilter = selectWarehouse.selectedOptionValues.join(',')
		var ownerFilter = selectOwner.selectedOptionValues.join(',')
		var orderTypeFilter = selectOrderType.selectedOptionLabels.join(',')
		
		var jobOrderList = []
		var addedJobOrders = []
		
		_.map(tblJobOrder.tableData, function(jobOrder){
			console.log(jobOrder)
			if(!_.includes(addedJobOrders, jobOrder["Job Order"])){
				jobOrderList.push({"label" : jobOrder["Job Order"], "value" : jobOrder["Job Order"]})
				addedJobOrders.push(jobOrder["Job Order"])
			}
		});
		
		storeValue("jobOrderList", jobOrderList)
		
		navigateTo('Order Report Detail',{
			warehouse:warehouseFilter, 
			owner:ownerFilter,
			jobOrderType:orderTypeFilter,
			jobOrder:tblJobOrder.triggeredRow["Job Order"],
		}, 'SAME_WINDOW')
	}

}