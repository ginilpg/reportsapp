export default {
	refresh: () => {
		return queryOrderType.run().then(res => {	
			if (!_.isEmpty(res.errors)) { throw ( res.errors) }
			return res.data
		})
	},

	view: () => {
		if (queryOrderType.data == null ) {
			return []
		}
		return queryOrderType.data.data.__type.enumValues.map((item)=>({"label":item.name, "value":item.name}))
	}
}