export default {

	view: () => {
		var addressDetails = {}
		
		if (_.isEmpty(Dom_OpReq.view_get())) return showAlert("Cant find Operations Request")
	
		var opReq = Dom_OpReq.view_get()
		var shipTo = opReq.shipTo
		
		
		//console.log("SHIPPP " , shipTo)
		addressDetails.name = shipTo?.address?.name ?? ""
		addressDetails.number = shipTo?.address?.number ?? ""
		addressDetails.street1 = shipTo?.address?.street1 ?? ""
		addressDetails.street2 = shipTo?.address?.street2 ?? ""
		addressDetails.city = shipTo?.address?.city ?? ""
		addressDetails.postCode = shipTo?.address?.postCode ?? ""
		addressDetails.state = shipTo?.address?.state ?? ""
		addressDetails.countryCode = shipTo?.address?.countryCode ?? ""

		addressDetails.attention = shipTo?.attention ?? ""
		addressDetails.companyCode = shipTo?.companyCode ?? ""

		return addressDetails
	},

}