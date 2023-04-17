export default {
	refresh: (binId) => {
		return Adp_BinCarriers.refresh(binId)
	},
	view: () => {
		const output = []
		const carriers = Adp_BinCarriers.view()
		carriers.forEach(item => {
    const materialStrings = item.contents ? item.contents.map(content => `${content.material.code} Qty ${content.quantity}`) : ['empty'];
			const contentsString = materialStrings.join(', ')
			const newItem = {
				code: item.code,
				status: item.status.code,
				owner: item.owner?.name,
				contents: contentsString
			};
			if (_.isUndefined(newItem.owner)) newItem.owner = ""
			output.push(newItem)
		})
		return output
	},
	addCarrier:(carrier,id)=>{
		const carriers = []
		carrier.storageLocation = {id: id}
		carriers.push(carrier)
		return Adp_BinCarriers.addCarrier(carriers)
	}
}
