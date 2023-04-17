export default {
	
	refresh: (name) => {
		return queryGetJobOrder.run({
			variables:{
				name:name,
			}
		})			
		.then(res => {	
			if (!_.isEmpty(res.errors)) { throw ( res.errors) }
			return res.data
		})
	},
	
	view: () => {
		if (queryGetJobOrder.data == null ) {
			return []
		}
		return queryGetJobOrder.data.data.getJobOrder
	}
}