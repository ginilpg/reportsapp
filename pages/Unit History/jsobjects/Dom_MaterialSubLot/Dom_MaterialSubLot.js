export default {
	refresh: (payload) => {
		return Adp_MaterialSubLot.refresh(payload)
	},
	view: () => {
		return Adp_MaterialSubLot.view()
	},
	
	containsOneResult: () => {
		return Adp_MaterialSubLot.view().length == 1
	}
	
	
}