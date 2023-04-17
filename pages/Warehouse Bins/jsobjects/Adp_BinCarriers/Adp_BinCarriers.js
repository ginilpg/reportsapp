export default {
	refresh: (input) => {
		return getBinCarriers.run({input:input})
			.then(res => {	
				if (!_.isEmpty(res.errors)) { throw ( res.errors) }
				return res.data
			})
	},
	view: () => {
		if (getBinCarriers.data == null || 
				getBinCarriers.data.data.getEquipment == null) {
			return []
		}
		return getBinCarriers.data.data.getEquipment.carriers
	},
	test:() => {
		return Adp_BinCarriers.refresh("0x19f")
	},
	addCarrier: (input) => {
		console.log(input)
		return AddCarrier.run({variables:{input:input}})
	}
	
}