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
		if (queryPartner.data == null || 
				queryPartner.data.data.queryPartner == null) {
			return []
		}
		return queryPartner.data.data.queryPartner
	}
}