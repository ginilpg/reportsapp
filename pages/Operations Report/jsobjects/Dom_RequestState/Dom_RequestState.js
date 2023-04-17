export default {
	refresh: () => {
		return Adp_RequestState.refresh()
	},
	view: () => {
		return Adp_RequestState.view().map((item)=>({"label":item.name, "value":item.id}))
	},
	
}