export default {
	refresh: (input) => {
		return getWarehouseBins.run({input:input})
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},
	view: () => {
		if (getWarehouseBins.data == null || 
				getWarehouseBins.data.data.getEquipment == null) {
			return []
		}
		return getWarehouseBins.data.data.getEquipment.children
	},
	test:() => {
		return Adp_WarehouseBins.refresh("0x18c")
	}
	
}