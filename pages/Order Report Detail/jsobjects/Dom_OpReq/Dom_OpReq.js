export default {
	refresh: (opReqFilter, equipmentFilter, ownerFilter) => {
		return Adp_OpReq.refresh(opReqFilter, equipmentFilter, ownerFilter)
	},
	view: () => {
		return Adp_OpReq.view()
	}
}