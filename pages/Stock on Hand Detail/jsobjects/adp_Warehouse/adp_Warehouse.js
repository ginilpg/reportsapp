export default {
	refresh: () => {
		return queryWarehouse.run().then(res => {	
			if (!_.isEmpty(res.errors)) throw res.errors
			return res?.data?.queryEquipment
		})
	},
	
	view: () => queryWarehouse?.data?.data?.queryEquipment,
}