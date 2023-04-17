export default {
	
	refresh: (opReqFilter, ownerFilter) => {
		return queryOperationsRequest.run({
			variables:{
				opReqFilter:opReqFilter,
				ownerFilter:ownerFilter
			}
		})			
		.then(res => {	
			if (!_.isEmpty(res.errors)) { throw ( res.errors) }
			return res.data
		})
	},
	
	view: () => {
		if (queryOperationsRequest.data == null ) {
			//return []
			return appsmith.store.jobOrderList
		}
		return queryOperationsRequest.data.data.queryOperationsRequest
	}
}