export default {
	viewName: () => {
		var propertyData = Dom_Property.view()
		
		var mappedProperties = _.map(propertyData, function(item){
			return {"label":item.label, "value":item.label}
		})
		
		var uniqueProperties = _.uniqBy(mappedProperties, "label")
		return uniqueProperties
	},
	propertiesNameChanged: () => {
		
		
		resetWidget("selectPropertyValue", true)
		var propertyData = Dom_Property.view()
		var propertyValues = []
		var propertyValuesMap = []
		var propertyValuesList = []
		for(var i=0; i<_.size(propertyData); i++){
			if(_.includes(selectPropertyName.selectedOptionLabels, propertyData[i].label)){
				propertyValues.push({"label":propertyData[i].value ?? "null","value":propertyData[i].value ?? "null"})
				propertyValuesMap.push({"label":propertyData[i].value ?? "null","value":propertyData[i].label ?? "null"})
				propertyValuesList.push(propertyData[i].value ?? "null")
			}
		}
		var uniqueProperties = _.uniqBy(propertyValues, "label")
		propertyValuesMap = _.uniqBy(propertyValuesMap, "label")
		propertyValuesList = _.uniq(propertyValuesList)

		return storeValue("propertyValuesMap", propertyValuesMap)
		.then(() => storeValue("propertyValuesList", propertyValuesList) )
		.then(() => storeValue("uniqueProperties", uniqueProperties) )
		
		
	},
	viewValue: () => {
		return appsmith.store.uniqueProperties
	},
}