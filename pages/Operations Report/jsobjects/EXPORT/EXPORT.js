export default {
	
	exportClicked: async () => {
		let searchParams = Pres_OpReq.getSearchFilters()
		let queryFilter = Dom_OpReq.createOpReqInput(searchParams)
		queryFilter = _.omit(queryFilter,'first','offset')
		
		return navigateTo('Bulk Export', {
			"pageName": "OperationsReport",
			"query": Dom_OpReq.query(),
			"filter":  JSON.stringify(queryFilter),
		},'NEW_WINDOW')
		
	},

}