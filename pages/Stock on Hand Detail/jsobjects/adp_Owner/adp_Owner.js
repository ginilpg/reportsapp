export default {
	refresh: (partners) => {
		return queryPartner.run({partners}).then(res => {	
			if (!_.isEmpty(res.errors)) throw res.errors
			return res?.data?.queryPartner
		})
	},
	
	view: () => queryPartner?.data?.data?.queryPartner,
}