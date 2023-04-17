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
		var data = Dom_Owner.view()

		if(data.length <= 1){
			return data
		}
	}
	
}