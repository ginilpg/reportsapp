export default {
	handle_OnPageLoad: () => {
		return Adp_Warehouse.refresh()
			.then(() => Adp_OrderType.refresh())
			.then(() => Adp_Owner.refresh())
			.then(() => Cmd_OpReq.refresh())
			.then(() => showAlert("Page Load Successful"))
			.catch((e) => showAlert(JSON.stringify(e)))
	},
}