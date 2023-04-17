export default {

	generalDetails: () => {
		var data = Dom_JobOrder.view()
				
		var jobOrder = (!_.isEmpty(data.name) ? data.name : "")
		var segReq = (!_.isEmpty(data.segmentRequirement?.code) ? data.segmentRequirement.code : "")
		var opReq = (!_.isEmpty(data.segmentRequirement?.operationsRequest?.code) ? data.segmentRequirement.operationsRequest.code : "")

		var created = (!_.isEmpty(data.createdDateTime) ? data.createdDateTime : "")
		var activated = (!_.isEmpty(data.jobResponses?.[0]?.startDateTime) ? data.jobResponses[0].startDateTime : "")
		var completed = (!_.isEmpty(data.jobResponses?.[0]?.endDateTime) ? data.jobResponses[0].endDateTime : "")

		//Create Personnel List
		var personnel = ""
		var personnelActual = data.jobResponses?.[0]?.personnelActual
		if(!_.isEmpty(personnelActual)){
			for(var personIndex = 0; personIndex <= _.size(personnelActual[personIndex]); personIndex++){
				personnel = personnel + personnelActual[personIndex]?.person?.name + "\n\n"
			}
		}else{
			personnel = ""
		}
		
		// If both start and end dates exist, find the duration
		var startDateTime = data.jobResponses?.[0]?.startDateTime
		var endDateTime = data.jobResponses?.[0]?.endDateTime
		var durationDateTime = null
		
		if(!_.isEmpty(startDateTime)  && !_.isEmpty(endDateTime)){
			var diff = moment.duration(moment(endDateTime).diff(moment(startDateTime)));
			var days = diff.days()
			var hours = diff.hours()
			var minutes = diff.minutes()
			if(days != 0){
				hours = hours + (24 * days)
			}
			durationDateTime = hours + "h " + minutes + "m"
		}

		created = this.formatDateTime(created)
		activated = this.formatDateTime(activated)
		completed = this.formatDateTime(completed)
		
		var generalDetails = {
			jobOrder:jobOrder,
			segReq:segReq,
			opReq:opReq,
			created:created,
			activated:activated,
			completed:completed,
			duration:durationDateTime,
			personnel:personnel
		}
		return generalDetails
	},
	
	materialDetail: () => {
		var jobOrderData = Dom_JobOrder.view()
		var stockOnHandData = Dom_InventoryTransactions.view()
		var tableData = []
		
		var matReqs = jobOrderData.segmentRequirement?.materialRequirements
		
		if(!_.isEmpty(matReqs)){
			_.map(matReqs, function(matReq){
				
				var materialCode = (!_.isEmpty(matReq.material?.code) ? matReq.material.code : "")
				var materialDescription = (!_.isEmpty(matReq.material?.description) ? matReq.material.description : "")
				var plannedQuantity = matReq.quantity
				var materialClassCode = (!_.isEmpty(matReq.material?.materialClass?.code) ? matReq.material.materialClass.code : "")
				var materialClassDescription = (!_.isEmpty(matReq.material?.materialClass?.description) ? matReq.material.materialClass.description : "")
				var actualQuantity = null
				
				if(!_.isEmpty(stockOnHandData)){
					_.map(stockOnHandData, function(transactionData){
						if(transactionData.material?.code == materialCode){
							if(transactionData.quantity > 0){
								actualQuantity += transactionData.quantity
							}
						}
					})
				}

				tableData.push({
					"Material Code":materialCode,
					"Material Description":materialDescription,
					"Planned Quantity":plannedQuantity,
					"Actual Quantity":actualQuantity,
					"Material Class":materialClassCode,
					"Material Class Description":materialClassDescription
				})
			})
		}else{
			
			// If there is no data, show blank info so the table headers show the correct information
			var blank = [{
				"Material Code":"",
				"Material Description":"",
				"Planned Quantity":"",
				"Actual Quantity":"",
				"Material Class":"",
				"Material Class Description":""
			}]
			return blank
		}
		return tableData
	},

	transactionDetail: () => {
		var stockOnHandData = Dom_InventoryTransactions.view()
		var tableData = []
				
		if(!_.isEmpty(stockOnHandData)){
			_.map(stockOnHandData, function(transactionData){

				var timestamp = (!_.isEmpty(transactionData.timestamp) ? transactionData.timestamp : "")
				var materialCode = (!_.isEmpty(transactionData.material?.code) ? transactionData.material.code : "")
				var status = (!_.isEmpty(transactionData.status?.code) ? transactionData.status.code : "")
				var shipment = (!_.isEmpty(transactionData.shipment?.consignmentNumber) ? transactionData.shipment.consignmentNumber : "")
				var quantity = transactionData.quantity
				var bin = (!_.isEmpty(transactionData.storageLocation?.name) ? transactionData.storageLocation.name : "")
				var carrier = (!_.isEmpty(transactionData.carrier?.code) ? transactionData.carrier.code : "")

				timestamp = this.formatDateTime(timestamp)

				var data = {
					"Transaction Timestamp":timestamp,
					"Material Code":materialCode,
					"Status":status,
					"Shipment":shipment,
					"Carrier":carrier,
					"Bin":bin,
					"Quantity":quantity
				}
				tableData.push(data)
			})
		}else{
			
			// If there is no data, show blank info so the table headers show the correct information
			var blank = [{
				"Transaction Timestamp": "",
				"Material Code": "",
				"Status": "",
				"Shipment": "",
				"Carrier": "",
				"Bin": "",
				"Quantity": ""
			}]
			return blank
		}

		// Sorting by timestamp by default
		tableData = _.orderBy(tableData, ['Transaction Timestamp'],['desc']); // Use Lodash to sort array by 'name'

		return tableData
	},
	
	refreshStockOnHand: async () => {
		var data = Dom_JobOrder.view()
					
		var jobResponseID = data.jobResponses?.[0]?.id		
		
		if(!_.isEmpty(jobResponseID)){
			await Cmd_InventoryTransactions.refresh(jobResponseID)
		}																								
	},
	
	formatDateTime: (dateTime) => {
		if(!_.isEmpty(dateTime)){
			return moment(dateTime).format('DD/MM/YYYY, h:mm:ss a')
		}else{
			return ""
		}
	},

}