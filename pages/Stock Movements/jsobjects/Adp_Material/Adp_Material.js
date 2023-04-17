export default {
	refresh: (warehouse, owner) => {
		var variables = { 
			variables: 
				{
					"warehouse": { "id" : warehouse },
					"owner": { "id" : owner }
				}
			}
		
		return queryMaterial.run(variables)
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},
	view: () => {
		if (queryMaterial.data == null || 
				queryMaterial.data.data.queryMaterialDefinition == null) {
			return []
		}
		return queryMaterial.data.data.queryMaterialDefinition
	}
}