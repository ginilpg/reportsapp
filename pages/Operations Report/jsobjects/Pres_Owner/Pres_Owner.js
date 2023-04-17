export default {
	defaultValue:() => {
		const data = Dom_Owner.view()
		if (data.length == 1) return data[0]?.value
		return
	},
}