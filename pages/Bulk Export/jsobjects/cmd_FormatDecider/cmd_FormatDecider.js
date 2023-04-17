export default {
	queryObject: () => {
		if (_.isEmpty(appsmith.store["bulkReportPageName"])) return
		switch(appsmith.store["bulkReportPageName"]) {
			case "StockOnHand":
				return dom_StockOnHand
				break;
			case "StockOnHandDetail":
				return dom_StockOnHandDetail
				break;
			case "OperationsReport":
				return dom_OperationsReport
				break;
			case "StockMovements":
				return dom_StockMovements
				break;
			default:
				break;
		}
	},
	
	view: () => this.queryObject()?.viewFormatted() ?? [],
}