export default {
	refresh: () => {
		return queryProperty.run()
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},
	
	view: () => {
		if (queryProperty.data == null ) {
			return []
		}
		return queryProperty.data.data.queryProperty.map((item)=>({"label":item.name, "value":item.value}))
	},

	

}