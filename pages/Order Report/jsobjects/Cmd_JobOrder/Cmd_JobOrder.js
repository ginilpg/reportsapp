export default {

	refresh: () => {
		
		var opReqFilter = {}
		if(!_.isEmpty(selectOrderType.selectedOptionLabels)){
			opReqFilter.orderType = {in:selectOrderType.selectedOptionLabels}
		}
		
		if(!_.isEmpty(inpOpReqCode.text)){
			opReqFilter.code = {eq:inpOpReqCode.text}
		}
		
		var ownerFilter = {}
		if(!_.isEmpty(selectOwner.selectedOptionLabels)){
			ownerFilter.name = {in: selectOwner.selectedOptionLabels}
		}
		
		return Dom_JobOrder.refresh(opReqFilter, ownerFilter)
	},
	
}