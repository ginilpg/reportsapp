export default {
	
	// Handle Domain for queryOperationsRequest
	refresh_query: (opReqFilter, equipmentFilter) => {
		return Adp_OpReq.refresh_query(opReqFilter, equipmentFilter)
	},
	view_query: () => {
		return Adp_OpReq.view_query()
	},
	
	// Handle Domain for getOperationsRequest
	refresh_get: (opReqCode) => {
		return Adp_OpReq.refresh_get(opReqCode)
	},
	view_get: () => {
		return Adp_OpReq.view_get()
	},
}