export default {
	view: () => adp_QueryGeneric.view()?.queryOperationsRequest ?? [],
	viewFormatted: () => this.formatOperationsRequest(),
	
	// Function to format data into format readable by the table
	formatOperationsRequest: (res) => {
		const data = res ?? dom_OperationsReport.view()
		let tableData = []

		_.map(data, function(opReq){
			var opReqCode = (!_.isEmpty(opReq.code) ? opReq.code : "")
			var orderType = (!_.isEmpty(opReq.orderType) ? opReq.orderType : "")
			var requestState = (!_.isEmpty(opReq.requestState.name) ? opReq.requestState.name : "")
			var opDefinitionName = (!_.isEmpty(opReq.operationsDefinition.name) ? opReq.operationsDefinition.name : "")
			var equipmentName = (opReq.equipment?.name ?? "")

			var ownerName = ""
			if(!_.isEmpty(opReq.customer)){
				ownerName = (!_.isEmpty(opReq.customer.name) ? opReq.customer.name : "")
			}

			var createdDateTime =  opReq.createdDateTime
			var startDateTime = ""
			var endDateTime = ""

			//Properties section
			var propertiesList = []	
			if(!_.isEmpty(opReq.properties)){
				propertiesList = opReq.properties.map((item) => (item.name + " - " + (!_.isEmpty(item.value) ? item.value : "")))
			}
			var formattedPropertiesList = ""
				for(var i = 0; i < _.size(propertiesList); i++){
					formattedPropertiesList += propertiesList[i] + "\n"
			}

			
			for (let segReqIndex = 0; segReqIndex < _.size(opReq.segmentRequirements); segReqIndex++) {
				var segReq = opReq.segmentRequirements[segReqIndex]

				for (let jobOrderIndex = 0; jobOrderIndex < _.size(segReq.jobOrders); jobOrderIndex++) {
					var jobOrder = segReq.jobOrders[jobOrderIndex]
					//var jobOrderEquipment = (!_.isEmpty(jobOrder.equipment?.name) ? jobOrder.equipment?.name : "Not yet in Warehouse")

					for(let jobResponseIndex = 0; jobResponseIndex < _.size(jobOrder.jobResponses); jobResponseIndex++){
						var jobResponse = jobOrder.jobResponses[jobResponseIndex]

						// Handle getting earliest start date time
						if(!_.isEmpty(jobResponse.startDateTime)){
							if(_.isEmpty(startDateTime)){
								startDateTime = jobResponse.startDateTime
							}else if(moment(jobResponse.startDateTime).isBefore(moment(startDateTime))){
								startDateTime = jobResponse.startDateTime
							}
						}
						// Handle getting latest end date time
						if(!_.isEmpty(jobResponse.endDateTime)){
							if(_.isEmpty(endDateTime)){
								endDateTime = jobResponse.endDateTime
							}else if(moment(jobResponse.endDateTime).isAfter(moment(endDateTime))){
								endDateTime = jobResponse.endDateTime
							}
						}
					}
				}
			}
			let duration
			if (endDateTime && startDateTime) {
				const durationRaw = moment.duration(moment(endDateTime).diff(moment(startDateTime)));
				duration = `${durationRaw.hours() + (24 * durationRaw.days())}h ${durationRaw.minutes()}m ${durationRaw.seconds()}s`
			}
			
			// Add row for the table data
			var rowData = {
				"Operations Request" : opReqCode,
				"Operations Definition" : opDefinitionName,
				"Order Type" : orderType, 
				"Request State" : requestState,
				"Warehouse" : equipmentName,//jobOrderEquipment,
				"Owner" : ownerName,
				"Properties (name - value)" : formattedPropertiesList,
				"Created" : createdDateTime,
				"Activated" : startDateTime,
				"Completed" : endDateTime,
				"Duration" : duration,
			}
			tableData.push(rowData)
		})
		return tableData
	},
	
	
	
	
}