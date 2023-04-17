export default {
	refresh: (warehouse, owner) => {
		const filter = dom_Material.buildMaterialFilter(warehouse, owner)
		return dom_Material.refresh(filter)
	},
}