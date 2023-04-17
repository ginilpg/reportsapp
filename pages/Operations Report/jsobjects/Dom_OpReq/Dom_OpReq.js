export default {
	refresh: () => {
		return Cmd_OpReq.refresh()
	},
	view: () => {
		return Adp_OpReq.view()
	},


	createOpReqInput: (selectedFilterInputs) => {

		const { selectedOrderTypes, opReqCode, owner, attention, dateFrom, dateTo, excludeCompleted, selectedRequestStates, warehouses, excludeInWarehouse, selectedPropNames, selectedPropValues } = selectedFilterInputs

		var cascadeFields = ["customer"]

		// Operations Request Filter
		var opReqFilter = {}
		if(!_.isEmpty(selectedOrderTypes)){
			opReqFilter.orderType = {in:selectedOrderTypes}
		}

		// Operations Request Filter
		if(!_.isEmpty(dateFrom) && !_.isEmpty(dateTo)){
			opReqFilter.createdDateTime = {between:{min:dateFrom,max:dateTo}}
		}else if(!_.isEmpty(dateFrom)){
			opReqFilter.createdDateTime = {gt:dateFrom}
		}else if(!_.isEmpty(dateTo)){
			opReqFilter.createdDateTime = {lt:dateTo}
		}

		var opReqOrder = {}
		if(!_.isEmpty(dateFrom) || !_.isEmpty(dateTo)) {
			opReqOrder.desc = "createdDateTime"
		}

		// Operations Request Code Filter
		if(!_.isEmpty(opReqCode)){
			opReqFilter.code = {eq:opReqCode}
		}



		// Owner Filter
		var ownerFilter = {}
		if(!_.isEmpty(owner)){
			ownerFilter.name = {in: owner}
		}

		// Attention Filter: i.e. shipTo person name
		var attentionFilter = {}
		if(!_.isEmpty(attention)) {
			attentionFilter.attention = {eq: attention}
			cascadeFields.push("shipTo")
		}

		// Job Order Filter: remove?
		var jobOrderFilter = {}
		if(!_.isEmpty(dateFrom) && !_.isEmpty(dateTo)){
			jobOrderFilter.createdDateTime = {between:{min:dateFrom,max:dateTo}}
		}else if(!_.isEmpty(dateFrom)){
			jobOrderFilter.createdDateTime = {gt:dateFrom}
		}else if(!_.isEmpty(dateTo)){
			jobOrderFilter.createdDateTime = {lt:dateTo}
		}

		// Reqest state filter
		var requestStateFilter = {}
		if(excludeCompleted){
			requestStateFilter.not = {name:{in:["COMPLETED", "COMPLETE"]}}
		}
		if(!_.isEmpty(selectedRequestStates)) {
			requestStateFilter.name = {in:selectedRequestStates}
		}
		if (!_.isEmpty(requestStateFilter)) {
			cascadeFields.push("requestState")
		}

		// Equipment Filter
		var equipmentFilter = {}
		if(!_.isEmpty(warehouses) && !excludeInWarehouse){
			equipmentFilter = {"name":{ "in": warehouses } }
			cascadeFields.push("equipment")
		} else if (excludeInWarehouse) {
			opReqFilter.not = { has: "equipment" }
		}

		// Property filter
		var propertyFilter = {}
		if (!_.isEmpty(selectedPropNames)) {
			propertyFilter.name = { in: selectedPropNames }
		}
		if (!_.isEmpty(selectedPropValues)) {
			propertyFilter.and =  { value: { in: selectedPropValues } }
		}
		if (!_.isEmpty(propertyFilter)) {
			cascadeFields.push("properties")
		}

		let first = dom_Pagination.pageSize()
		let offset = dom_Pagination.pageSize() * dom_Pagination.pageNo()

		return {
			opReqFilter:opReqFilter,
			ownerFilter:ownerFilter,
			jobOrderFilter:jobOrderFilter,
			requestStateFilter:requestStateFilter,
			first:first,
			offset:offset,
			attentionFilter: attentionFilter,
			cascadeFields: cascadeFields,
			equipmentFilter: equipmentFilter,
			propertyFilter: propertyFilter,
			opReqOrder: opReqOrder
		}

	},



	// Function to format data into format readable by the table
	formatLine: (res) => {
		const data = res ?? Dom_OpReq.view()
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

	query: () => `query($opReqFilter: OperationsRequestFilter!, $ownerFilter: PartnerFilter, $jobOrderFilter:JobOrderFilter, $requestStateFilter:RequestStateFilter,
		$first:Int, $offset:Int, $attentionFilter: CompanyAddressFilter, $cascadeFields: [String!]!, $equipmentFilter:EquipmentFilter, $propertyFilter:PropertyFilter,$opReqOrder: OperationsRequestOrder){
			queryOperationsRequest(first:$first, offset:$offset, filter:$opReqFilter, order:$opReqOrder) @cascade(
				fields:$cascadeFields)
			{
				code
				orderType
				createdDateTime
				equipment(filter:$equipmentFilter){
					name
				}
				shipTo(filter:$attentionFilter) {
					id
					attention
				}
				customer(filter:$ownerFilter){
					name
				}
				requestState(filter:$requestStateFilter){
					name
				}
				operationsDefinition{
					name
				}
				segmentRequirements {
					code
					jobOrders(filter:$jobOrderFilter){
						name
						dispatchStatus
						name
						equipment{
							name
						}
						createdDateTime
						jobResponses{ 
							startDateTime
							endDateTime
						}
					}
				}
				properties (filter: $propertyFilter ) {
					name
					value
				}
			}
		}`.replace(/\s+/g, ' '),




}