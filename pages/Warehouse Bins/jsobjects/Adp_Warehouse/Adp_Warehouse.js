export default {
	refresh: () => {
		return queryWarehouse.run()
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},
	view: () => {
		if (queryWarehouse.data == null || 
				queryWarehouse.data.data.queryEquipment == null) {
			return []
		}
		return queryWarehouse.data.data.queryEquipment
	}
}