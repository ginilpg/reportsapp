export default {

	view: () => {
		var data = Dom_Owner.view()
		
		if(data.length <= 1){
			selectOwner.isDisabled = true
		}else{
			selectOwner.isDisabled = false
		}
		
		return data
	},
	
	defaultValue:() => {
		if(!_.isEmpty(appsmith.URL.queryParams.owner)){
			return appsmith.URL.queryParams.owner
		}else{
			var data = Dom_Owner.view()
			if(data.length <= 1){
				return data[0]
			}
		}
	},
	
}