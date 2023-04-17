export default {
	handle_OnPageLoad: () => {
		return Adp_Warehouse.refresh()
			.then(() => Adp_OrderType.refresh())
			.then(() => Adp_Owner.refresh())
			.then(() => Cmd_OpReq.refresh_query())
			.then(() => showAlert("Page Load Successful"))
			.then(() => Pres_OpReq.searchButtonClicked())
			.catch((e) => showAlert(JSON.stringify(e)))
	},
	
	handle_FormatDateTime: (dateTime) => {
		if(!_.isEmpty(dateTime)){
			return moment(dateTime).format('DD/MM/YYYY, h:mm:ss a')
		}else{
			return ""
		}
	},
}