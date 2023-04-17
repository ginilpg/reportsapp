export default {
	onPageLoad: () => {
		return Promise.all([
			dom_Warehouse.refresh(),
			dom_Owner.refresh(),
		]).catch(_err.showErr)
	},
}