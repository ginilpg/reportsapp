export default {

	view: () => {
		return Dom_Warehouse.view()
	},
	
	defaultValue: () => {
		if(!_.isEmpty(appsmith.URL.queryParams.warehouse)){
			return appsmith.URL.queryParams.warehouse
		}else{
			return ""
		}
	}
}