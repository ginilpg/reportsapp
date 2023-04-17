export default {

	populate: () => {
		
	},
	
	submit: () => {
		return Dom_BinCarriers.addCarrier(frmAddCarrier.formData, tblBins.selectedRow.id)
		.then(()=>{
			Dom_BinCarriers.refresh(tblBins.selectedRow.id)
		})
		.then(()=>{
			closeModal("modalAddCarrier")
		})
		.then(()=>{
			Dom_WarehouseBins.refresh(selectWarehouse.selectedOptionValue)
		})
		.catch((e)=>{
			showAlert(JSON.stringify(e.message))
		})
	},

}