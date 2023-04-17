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
				queryPartner.data.data.queryPartner == null) {
			return []
		}
		return queryWarehouse.data.data.queryEquipment
	}
}