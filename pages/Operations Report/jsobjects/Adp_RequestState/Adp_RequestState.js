export default {
	refresh: () => {
		return queryRequestState.run()
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},
	
	view: () => {
		if (queryRequestState.data == null ) {
			return []
		}
		return queryRequestState.data.data.queryRequestState.filter(string => /^[a-zA-Z0-9 ]*$/.test(string.name))
	}
}