export default {

	refresh: async (opReqRes) => {
		
		var opReq = opReqRes ?? Dom_OpReq.view_get()
		var jobResponseIDArray = []
		
		// Segment Requirement Level
		if(!_.isEmpty(opReq.segmentRequirements)){
			_.map(opReq.segmentRequirements, function(segReq){

				//Job Order Level
				if(!_.isEmpty(segReq.jobOrders)){
					_.map(segReq.jobOrders, function(jobOrder){

						//Job Responses Level
						if(!_.isEmpty(jobOrder.jobResponses)){
							_.map(jobOrder.jobResponses, function(jobResponse){
								jobResponseIDArray.push({id:jobResponse.id})
							})
						}
					})
				}
			})
		}
		
		if (_.isEmpty(jobResponseIDArray)) jobResponseIDArray.push(-1)

		var filter = {
			jobResponse:jobResponseIDArray,
		}		
		console.log(filter)
		return Dom_InventoryTransactions.refresh(filter)
	},
	
}