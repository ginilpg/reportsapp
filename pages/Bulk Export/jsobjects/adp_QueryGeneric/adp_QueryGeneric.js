export default {
	refresh: (query, input) => {
		return queryGeneric.run({query, input}).then(res => {	
			if (!_.isEmpty(res?.errors)) throw res
			return res?.data
		}).catch(err => {throw err})
	},

	view: () => queryGeneric?.data?.data
}