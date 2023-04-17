export default {

	view: () => {
		return Dom_OrderType.view()
	},
	
	defaultValue: () => {
		if(!_.isEmpty(appsmith.URL.queryParams.orderType)){
			return appsmith.URL.queryParams.orderType
		}else{
			return ""
		}
	}
}