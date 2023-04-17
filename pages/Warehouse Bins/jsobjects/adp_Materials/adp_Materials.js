export default {
	refresh: (customerId, warehouseNames) => {
		return queryMaterials.run({customerId, warehouseNames}).then(res => {	
			if (!_.isEmpty(res?.errors)) throw res.errors
			return res?.data?.queryMaterialDefinition
		})
	},

	view: () => queryMaterials?.data?.data?.queryMaterialDefinition
}