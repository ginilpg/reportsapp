export default {

	view: () => {
		return Dom_OrderType.view()
	},
	
	defaultValue: () => {
		if(!_.isEmpty(appsmith.URL.queryParams.jobOrderType)){
			return appsmith.URL.queryParams.jobOrderType
		}else{
			return ""
		}
	}
}