export default {

	view: () => {
		
		if (_.isEmpty(Dom_OpReq.view_get())) return showAlert("Cant find Operations Request")
				
		var opReq = Dom_OpReq.view_get()

		var opDef = (!_.isEmpty(opReq.operationsDefinition?.name) ? opReq.operationsDefinition.name : "")
		var created = (!_.isEmpty(opReq.createdDateTime) ? opReq.createdDateTime : "")
		
		var segReqs = []
		var activated = null
		var completed = null
		
		// Segment Requirement Level
		if(!_.isEmpty(opReq.segmentRequirements)){
			_.map(opReq.segmentRequirements, function(segReq){
				//console.log("SEG REQ ", segReq)
				segReqs.push({code:segReq.code})

				//Job Order Level
				if(!_.isEmpty(segReq.jobOrders)){
					_.map(segReq.jobOrders, function(jobOrder){
						//console.log("JOB ORDER ", jobOrder)

						//Job Responses Level
						if(!_.isEmpty(jobOrder.jobResponses)){
							_.map(jobOrder.jobResponses, function(jobResponse){
								//console.log("JOB RESPONSE ", jobResponse)
	
								// Handle getting earliest start date time
								if(!_.isEmpty(jobResponse.startDateTime)){
									if(_.isEmpty(activated)){
										activated = jobResponse.startDateTime
									}else if(moment(jobResponse.startDateTime).isBefore(moment(activated))){
										activated = jobResponse.startDateTime
									}
								}

								// Handle getting latest end date time
								if(!_.isEmpty(jobResponse.endDateTime)){
									if(_.isEmpty(completed)){
										completed = jobResponse.endDateTime
									}else if(moment(jobResponse.endDateTime).isAfter(moment(completed))){
										completed = jobResponse.endDateTime
									}
								}

							})
						}
					})
				}
			})
		}
				
		// Properties
		var properties = []
		if(!_.isEmpty(opReq.properties)){
			_.map(opReq.properties, function(property){
				var name = "Name: " + property.name
				var value = "Value: " + property.value
				properties.push({name:name, value:value})																				 
			})
		}
		
		// Format the date times (more readable)
		created = Pres_HANDLERPAGE.handle_FormatDateTime(created)
		activated = Pres_HANDLERPAGE.handle_FormatDateTime(activated)
		completed = Pres_HANDLERPAGE.handle_FormatDateTime(completed)

		// Show user friendly message if no properties for the OpReq
		if(_.isEmpty(properties)){
			properties = [{name:"No Properties to display", value:""}]
		}
		
		// Show user friendly message if no segment requirem for the OpReq
		if(_.isEmpty(segReqs)){
			segReqs = [{code:"No Segment Requirements to display"}]
		}
		
		var generalDetails = {
			segReqs:segReqs,
			opDef:opDef,
			created:created,
			activated:activated,
			completed:completed,
			properties:properties
		}
	
		return generalDetails
	},
	
	test: ()=> {
		console.log("TEST")
	}
	
}