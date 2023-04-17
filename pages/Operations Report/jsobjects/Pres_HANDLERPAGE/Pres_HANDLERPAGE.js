export default {
	handle_OnPageLoad: () => {
		
		return Promise.all([
			storeValue("isLoad",false),
			Adp_OrderType.refresh(),
			Adp_Owner.refresh(),
			Adp_Warehouse.refresh(),
			Adp_RequestState.refresh(),
			Adp_Property.refresh()
		]).catch(_err.showErr())

		// return Adp_Owner.refresh()
		// .then(() => storeValue("isLoad",false))
		// .then(() => Adp_Owner.refresh())
		// .then(() => Adp_Warehouse.refresh())
		// .then(() => Adp_RequestState.refresh())
		// .then(() => Adp_Property.refresh())
		// .catch(_err.showErr())
	},


	handle_loadingState: () => {
		// Type search conducted
		let loading = queryOperationsRequest.isLoading || appsmith.store.isLoad
		let success = !_.isEmpty(Dom_OpReq.view()) && !appsmith.store.isLoad && queryOperationsRequest.responseMeta.isExecutionSuccess
		let fail = !queryOperationsRequest.responseMeta.isExecutionSuccess && !_.isUndefined(queryOperationsRequest.data)
		
		if (loading) {
			return {
				loadBarVisible: true,
				loadTextVisible: true,
				loadTextContent: "Loading...",
				showTableData: false
			}
		}
		if (success) {
			return {
				loadBarVisible: false,
				loadTextVisible: true,
				loadTextContent: ``,
				showTableData: true
			}
		}
		if (fail) {
			return {
				loadBarVisible: false,
				loadTextVisible: true,
				loadTextContent: "Database Error, please retry",
				showTableData: false
			}
		}
		return {
			loadBarVisible: false,
			loadTextVisible: false,
			loadTextContent: "",
			showTableData: false
		}

	},

}