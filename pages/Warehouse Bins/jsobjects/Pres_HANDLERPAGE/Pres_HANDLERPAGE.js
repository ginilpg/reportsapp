export default {
	handle_OnPageLoad: () => {
		return Adp_Warehouse.refresh()
			.then(() => showAlert("Page Load Successful"))
			.catch(_err.showErr)
	},
}