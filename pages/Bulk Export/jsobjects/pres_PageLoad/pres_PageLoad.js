export default {
	handleQueryLoad: async () => {
		const queryParams = appsmith.URL.queryParams
		if (_.isEmpty(queryParams)) return
		await storeValue("bulkLoading", true, false)
		await resetWidget("tblMassValues")

		const pageName = queryParams["pageName"]
		await storeValue("bulkReportPageName", pageName, false)

		if (pageName == "StockMovements") {
			const payload = await appsmith.store["bulkExport/payload"]
			await cmd_StockMovements.handle_load(payload)
				.catch(_err.showErr)
				.finally(() => storeValue("bulkLoading", false, false))
			return
		}

		const query = queryParams["query"]
		const filter = JSON.parse(queryParams["filter"])

		return adp_QueryGeneric.refresh(query, filter)
			.catch(_err.showErr)
			.finally(() => storeValue("bulkLoading", false, false))
	},
}