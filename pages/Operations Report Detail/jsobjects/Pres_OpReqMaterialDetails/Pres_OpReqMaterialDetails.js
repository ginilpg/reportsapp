export default {
	view: () => {

		if (_.isEmpty(Dom_OpReq.view_get())) return showAlert("Cant find Operations Request")

		var tableData = []
		var opReq = Dom_OpReq.view_get()
		var stockOnHandData = Dom_InventoryTransactions.view()

		// Segment Requirement Level
		if(!_.isEmpty(opReq.segmentRequirements)){
			_.map(opReq.segmentRequirements, function(segReq){

				//Material Requirement Level
				if(!_.isEmpty(segReq.materialRequirements)){
					_.map(segReq.materialRequirements, function(matReq){
						var segReqCode = (!_.isEmpty(segReq?.code) ? segReq.code : "")
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
							"Segment Requirement":segReqCode,
							"Material Code":materialCode,
							"Material Description":materialDescription,
							"Planned Quantity":plannedQuantity,
							"Actual Quantity":actualQuantity,
							"Material Class":materialClassCode,
							"Material Class Description":materialClassDescription
						})


					})
				}
			})
		}else{

			// If there is no data, show blank info so the table headers show the correct information
			var blank = [{
				"Segment Requirement":"",
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

	viewOperationsSegment: () => {
		return Dom_OpReq.view_get()?.segmentRequirements?.map(segReq => {
			return segReq?.segment?.materialSpecifications?.map(spec => {
				return {
					"Operations Segment" : segReq?.segment?.name,
					"Segment Requirement" : segReq?.code,
					"Material Code" : spec?.material?.code,
					"Material Description" : spec?.material?.description,
					"Material Class" : spec?.material?.materialClass?.code,
					"Quantity" : spec?.quantity ?? undefined, // Forces quantity to dissapeard if there is none. Null vs Undefined is weird
				}
			})
		}).flat()
	},
}