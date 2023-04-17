export default {
	
	handle_onSearchSubLotRegex: () => {
		
		storeValue("isLoad",true) 
		
		if (_.isEmpty(inpSubLotRegex.text)) { return showAlert("Input field empty") }
		let regex = "/" + inpSubLotRegex.text + "/"
		
		return Dom_MaterialSubLot.refresh(regex)
			.then((res) => {
				if (res.queryMaterialSubLot.length > 1) {
					throw new Error("Serial Number input too broad. Please specify.")
				}
				if (res.queryMaterialSubLot.length < 1) {
					throw new Error("No Matches Found. Please try again.")
				}
				return res.queryMaterialSubLot
			})
			.then((serialNumbers) => serialNumbers.map(item => {
				return {
					code: item.code
				}
			}))
			.then((queryInput) => {
				return Dom_InventoryTransactionsRaw.refresh(queryInput, selectOwner.selectedOptionValue)
				.catch((err) => {
					throw err
				})
			})
			.catch((err) => {
				return showAlert(JSON.stringify(err.message), "error")
				.then(() => storeValue("isLoad",false) )
			})
			.finally(() => storeValue("isLoad",false) )
		
	},
	

}