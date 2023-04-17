export default {
	handle_OnPageLoad: async () => {
		return Adp_Owner.refresh()
			.then(() => Adp_OrderType.refresh())
			.then(() => Adp_Warehouse.refresh())
			.then(() => showAlert("Page Load Successful"))
			.catch((e) => showAlert(JSON.stringify(e)))
	},
}