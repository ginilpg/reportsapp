export default {
	refresh: (regexPattern) => {
		return queryMaterialSubLot.run( {variables: {regexp: regexPattern}} )
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},
	view: () => {
		if (queryMaterialSubLot.data == null || 
				queryMaterialSubLot.data.data.queryMaterialSubLot == null) {
			return []
		}
		return queryMaterialSubLot.data.data.queryMaterialSubLot
	}
}