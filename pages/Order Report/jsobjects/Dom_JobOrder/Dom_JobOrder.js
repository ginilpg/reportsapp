export default {
	refresh: (opReqFilter, equipmentFilter, ownerFilter) => {
		return Adp_JobOrder.refresh(opReqFilter, equipmentFilter, ownerFilter)
	},
	view: () => {
		return Adp_JobOrder.view()
	}
}