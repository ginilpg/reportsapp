export default {
	
	refresh_query: (opReqFilter, requestStateFilter) => {
		return queryOperationsRequest.run({
			variables:{
				opReqFilter:opReqFilter,
				requestStateFilter:requestStateFilter,
			}
		})			
		.then(res => {	
			if (!_.isEmpty(res.errors)) { throw ( res.errors) }
			return res.data
		})
	},
	
	refresh_get: (opReqCode) => {
		return getOperationsRequest.run({
			variables:{
				opReqCode:opReqCode,
			}
		})			
		.then(res => {	
			if (!_.isEmpty(res.errors)) { throw ( res.errors) }
			return res.data.getOperationsRequest
		})
	},
	
	view_query: () => {
		if (queryOperationsRequest.data == null ) {
			return []
			//return appsmith.store.jobOrderList
		}
		return queryOperationsRequest.data.data.queryOperationsRequest
	},
	
	view_get: () => {
		if (getOperationsRequest.data == null ) {
			return []
			//return appsmith.store.jobOrderList
		}
		return getOperationsRequest.data.data.getOperationsRequest
	}
}