export default {

	refresh: (selectedFilterInputs, calledFromChangePage = false) => {
		
		let filterPayload = Dom_OpReq.createOpReqInput(selectedFilterInputs)

		// refreshPromise is a variable that either contains a promise returned by Cmd_AggregateFilter or an immediately resolved promise 
		let refreshPromise = calledFromChangePage ? Promise.resolve("Nosearch") : Cmd_AggregateFilter.refresh(filterPayload)
		return refreshPromise
			.then(() => Adp_OpReq.refresh(filterPayload))
			.catch((err) => {throw err})
	},
	

	
}