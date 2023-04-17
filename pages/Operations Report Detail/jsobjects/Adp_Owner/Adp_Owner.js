export default {
	refresh: () => {
		return queryPartner.run({
			variables:{
					input:Dom_UserProfile.libreAppRoleList()
				}
			})
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},
	view: () => {
		//return queryPartner.data.data.queryPartner
		if (queryPartner.data == null ) {
			return []
		}
		
		var data = []
		if(!_.isEmpty(queryPartner.data.data.queryPartner)){
			data = queryPartner.data.data.queryPartner
		}
		
		
		var blankOwner = {
			label:"No Owner",
			value:"null"
		}
				
		if(!_.some(data, blankOwner)){
			data.push(blankOwner)
		}
		
		return data
	}
}