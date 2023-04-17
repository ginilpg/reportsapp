export default {
	refresh: (opReqFilter, ownerFilter) => {
		return queryJobOrder.run({
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
		if (queryJobOrder.data == null ) {
			return []
		}
		return queryJobOrder.data.data.queryOperationsRequest
	}
}