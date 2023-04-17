export default {
	refresh: () => {
		return queryWarehouse.run()
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},
	view: () => {
		if (queryWarehouse.data == null ) {
			return []
		}
		
		var data = []
		if(!_.isEmpty(queryWarehouse.data.data.queryEquipment)){
			data = queryWarehouse.data.data.queryEquipment
		}
		
		
		var blankWarehouse = {
			label:"Not yet in Warehouse",
			value:"null"
		}
				
		if(!_.some(data, blankWarehouse)){
			data.push(blankWarehouse)
		}
		
		return data
	}
}