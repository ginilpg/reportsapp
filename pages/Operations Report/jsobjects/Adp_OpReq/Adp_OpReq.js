export default {
	
	refresh: (opReqInput) => {
		showAlert(opReqInput)
		return queryOperationsRequest.run( {variables: opReqInput} )			
		.then(res => {	
			if (!_.isEmpty(res.errors)) { throw ( res.errors) }
			return res.data.queryOperationsRequest
		})
	},
	
	view: () => {
		if (queryOperationsRequest.data == null ) {
			//return []
			return appsmith.store.jobOrderList
		}
		return queryOperationsRequest.data.data.queryOperationsRequest
	},
	

	
	
}