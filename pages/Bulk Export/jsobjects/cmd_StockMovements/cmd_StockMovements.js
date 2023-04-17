export default {
	handle_load: async (payloads) => {
		const promises = payloads.map(payload => adp_QueryGeneric.refresh(payload.query, JSON.parse(payload.filter)))
		const stockMovementsData = await Promise.all(promises)
		
		await storeValue('bulkExport/res', stockMovementsData)
		return stockMovementsData
	},
}