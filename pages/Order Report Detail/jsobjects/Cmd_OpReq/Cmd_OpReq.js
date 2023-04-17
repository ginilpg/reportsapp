export default {

	refresh: async () => {
		
		var opReqFilter = {}
		if(!_.isEmpty(selectOrderType.selectedOptionLabels)){
			opReqFilter.orderType = {in:selectOrderType.selectedOptionLabels}
		}
		
		var ownerFilter = {}
		if(!_.isEmpty(selectOwner.selectedOptionLabels)){
			ownerFilter.name = {in: selectOwner.selectedOptionLabels}
		}

		return Dom_OpReq.refresh(opReqFilter, ownerFilter)
	},
	
}