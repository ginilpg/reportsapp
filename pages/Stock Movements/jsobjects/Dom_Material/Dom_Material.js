export default {
	refresh: (warehouse, owner) => {
		if (_.isEmpty(owner)) owner = null
		return Adp_Material.refresh(warehouse, owner)
	},
	view: () => {
		return Adp_Material.view()
	}
}