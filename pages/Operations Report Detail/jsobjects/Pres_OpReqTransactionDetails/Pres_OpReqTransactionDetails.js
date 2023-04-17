export default {

	
	view: () => {
		var stockOnHandData = Dom_InventoryTransactions.view()
		var tableData = []
				
		if(!_.isEmpty(stockOnHandData)){
			_.map(stockOnHandData, function(transactionData){
				
				if(!(transactionData?.materialUse == "Consumed" && transactionData?.quantity >= 0) && !(transactionData?.materialUse != "Consumed" && transactionData?.quantity <= 0)){

					var jobResponseID = (!_.isEmpty(transactionData?.jobResponse?.id) ? transactionData.jobResponse.id: "")
					var timestamp = (!_.isEmpty(transactionData.timestamp) ? transactionData.timestamp : "")
					var materialCode = (!_.isEmpty(transactionData.material?.code) ? transactionData.material.code : "")
					var status = (!_.isEmpty(transactionData.status?.code) ? transactionData.status.code : "")
					
					var materialSubLotCode = (!_.isEmpty(transactionData.materialSubLot?.code) ? transactionData.materialSubLot.code : "")
					var materialUse = (!_.isEmpty(transactionData.materialUse) ? transactionData.materialUse : "")

					var consignmentNumber = (!_.isEmpty(transactionData.shipment?.consignmentNumber) ? transactionData.shipment.consignmentNumber : "")
					var shipmentId = (!_.isEmpty(transactionData.shipment?.id) ? transactionData.shipment.id : "")
					var shipment = ""
					if(_.isEmpty(consignmentNumber)){
						shipment = (!_.isEmpty(consignmentNumber) ? consignmentNumber : transactionData.shipment?.id)
					}else{
						shipment = (!_.isEmpty(shipmentId) ? shipmentId : "")
					}
					var quantity = transactionData.quantity
					var bin = (!_.isEmpty(transactionData.storageLocation?.name) ? transactionData.storageLocation.name : "")
					var carrier = (!_.isEmpty(transactionData.carrier?.code) ? transactionData.carrier.code : "")

					timestamp = Pres_HANDLERPAGE.handle_FormatDateTime(timestamp)

					var data = {
						"Job Response ID":jobResponseID,
						"Transaction Timestamp":timestamp,
						"Material Code":materialCode,
						"Status":status,
						"Shipment":shipment,
						"Carrier":carrier,
						"Bin":bin,
						"Quantity":quantity,
						"Material SubLot": materialSubLotCode,
						"Material Use": materialUse
					}
					tableData.push(data)
				}
			})
		}else{
			
			// If there is no data, show blank info so the table headers show the correct information
			var blank = [{
				"Job Response ID":"",
				"Transaction Timestamp": "",
				"Material Code": "",
				"Status": "",
				"Shipment": "",
				"Carrier": "",
				"Bin": "",
				"Quantity": "",
				"Material SubLot": "",
				"Material Use": ""
			}]
			return blank
		}

		// Sorting by timestamp by default
		tableData = _.orderBy(tableData, ['Transaction Timestamp'],['desc']); // Use Lodash to sort array by 'name'

		return tableData
	},
}