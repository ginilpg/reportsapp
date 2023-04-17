export default {
	handle_OnPageLoad: () => {
		return Adp_Warehouse.refresh()
			.then(() => Adp_Owner.refresh())
			.then(() => storeValue('isLoad', false))
			.then(() => showAlert("Page Load Successful"))
			.catch(_err.showErr)
	},
	
	test: () => {
		//return Object.keys(getOpeningStockBalances.responseMeta).length
		//return getOpeningStockBalances.responseMeta.statusCode
		
		let queries = [
			getOpeningStockBalances.responseMeta,
			getClosingStockBalances.responseMeta, 
			getTransactions.responseMeta
		]
		return queries.every(query => _.isUndefined(query.statusCode))
	},

	handle_loadingState: () => {
		// Type search conducted
		
		let queries = [
			getOpeningStockBalances.responseMeta,
			getClosingStockBalances.responseMeta, 
			getTransactions.responseMeta
		]
		
		
		
		let queryOpeningSuccess = getOpeningStockBalances.responseMeta.isExecutionSuccess && !_.isUndefined(getOpeningStockBalances.data)
		let queryClosingSuccess = getClosingStockBalances.responseMeta.isExecutionSuccess && !_.isUndefined(getClosingStockBalances.data)
		let queryTransactionSuccess = getTransactions.responseMeta.isExecutionSuccess && !_.isUndefined(getTransactions.data)
		
		let loading = getClosingStockBalances.isLoading || getOpeningStockBalances.isLoading || getTransactions.isLoading || appsmith.store.isLoad
		let success = !_.isEmpty(Dom_Movements.view()) && (!appsmith.store.isLoad && queryOpeningSuccess && queryClosingSuccess && queryTransactionSuccess )
		let fail = queries.some(query => query.statusCode !== "200 OK") && queries.some(query => query.isExecutionSuccess == false) && !queries.every(query => _.isUndefined(query.statusCode))

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
				loadTextContent: "Error, refresh page",
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
	
	
	setFromDate: () => {
		if (_.isEmpty(dateTo.selectedDate)) return new Date().toJSON()
		const date = new Date(Date.parse(dateTo.formattedDate))
		date.setTime(date.getTime() - 60000)
		return date.toJSON()
	},
}