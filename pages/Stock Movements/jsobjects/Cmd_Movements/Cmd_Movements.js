export default {
	refresh: (payload) => {
		
		const { from, to, owner, materials, warehouse, groupBySubLot, groupByJobResponse } = payload
		
		// Builds a list of promises while refreshing assorted domain components
		var promises = [] 
		promises.push(Dom_StockOnHand.refreshOpening(this.buildFilter(null, from, owner, materials, warehouse, false, groupBySubLot, groupByJobResponse)))
		promises.push(Dom_StockOnHand.refreshClosing(this.buildFilter(null, to, owner, materials, warehouse, false, groupBySubLot, groupByJobResponse)))
		promises.push(Dom_Transactions.refresh(this.buildFilter(from, to, owner, materials, warehouse, true, groupBySubLot, groupByJobResponse)))
		return Promise.all(promises)
	},
	buildFilter: (from, to, owner, material, warehouse, groupMaterialUse, groupBySubLot, groupByJobResponse) => {
		// Builds query filter and refreshes transactions
		var materialList = material.map(i => {
			return { code: i }
		})
		
		var filter = {
			variables: {
				...(!_.isEmpty(from) && { from: from }), 
				to: to, 
				...(!_.isEmpty(owner) && { owner: [{ id: owner }]}), 
				warehouse: [{ name: warehouse }],
				...(!_.isEmpty(materialList) && { material: materialList }), 
				groupBy: { 
					material:true, 
					...(!_.isEmpty(owner) && { owner: true }), 
					status: true, 
					warehouse: true,
					...(groupMaterialUse && { materialUse: true }),
				},
			}
		}
		
		if(groupBySubLot){
			filter.variables.groupBy.subLot = true
		}
		
		if(groupByJobResponse){
			filter.variables.groupBy.jobResponse = true
		}
		
		return filter
	},
	

	
	groupAndSum: (data, group1, group2, ...columnsToSum) => {
		// This function was written by chatGPT
		// First, we create an empty object that will store the grouped and summed data
		const groupedData = {};

		// Next, we loop through each object in the data array
		for (const object of data) {
			// We create a key for the grouped data object by combining the values of the two grouping columns for the current object
			const key = object[group1] + '|' + object[group2];

			// If the grouped data object does not already have an entry for this key, we create one and initialize it with 0 for each column that we want to sum
			if (!groupedData[key]) {
				groupedData[key] = columnsToSum.reduce((a, c) => {
					a[c] = 0;
					return a;
				}, {});
			}

			// Finally, we loop through each column that we want to sum, and add the value of that column for the current object to the corresponding value in the grouped data object
			for (const column of columnsToSum) {
				groupedData[key][column] += object[column];
			}
		}

		// After we have processed all objects in the input data array, we return the grouped and summed data
		return groupedData;
	},
	
	getFieldNames:(data)=> {
		// We use the Array.prototype.reduce() method to iterate through the array of objects,
		// and create an object with a property for each unique field name in the objects
		const fieldNames = data.reduce((a, c) => {
			Object.keys(c).forEach(k => a[k] = true);
			return a;
		}, {});

		// After we have created the object with all unique field names, we return its keys as an array
		return Object.keys(fieldNames);
	}

}