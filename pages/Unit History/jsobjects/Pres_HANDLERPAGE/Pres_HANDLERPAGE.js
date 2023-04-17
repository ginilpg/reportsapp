export default {
	handle_OnPageLoad: () => {
		storeValue("isLoad",false)
		return Adp_Owner.refresh().then(() => {
			if (appsmith.URL.queryParams.subLot) Pres_MaterialSubLot.handle_onSearchSubLotRegex()
		}).catch((e) => showAlert(JSON.stringify(e)))
	},

	handle_loadingState: () => {

		// type pre search
		if ( _.isEmpty(getInventoryTransactionsRaw.data) || _.isEmpty(queryMaterialSubLot.data) && !(getInventoryTransactionsRaw.isLoading || queryMaterialSubLot.isLoading) ) {
			return {
				key: "Start",
				loadContainerVisible: true,

				loadBarVisible: false,

				loadTextVisible: false,
				loadTextContent: "",

				headerTxtVisible: true,
				headerTxtStatus: "Unit History",

				showTableContents: false
			}
		}

		// Type search conducted
		if (getInventoryTransactionsRaw.isLoading || queryMaterialSubLot.isLoading || appsmith.store.isLoad) {
			return {
				key: "Loading",
				loadContainerVisible: true,

				loadBarVisible: true,

				loadTextVisible: true,
				loadTextContent: "Loading...",

				headerTxtVisible: true,
				headerTxtStatus: "Unit History",

				showTableContents: false
			}
		}

		// Type search fail
		if ( _.isEmpty(Dom_MaterialSubLot.view()) || Dom_MaterialSubLot.containsOneResult() !== true ) {

			return {
				key: "fail",
				loadContainerVisible: true,

				loadBarVisible: false,

				loadTextVisible: true,
				loadTextContent: 'Try again!' ,

				headerTxtVisible: true,
				headerTxtStatus: `Unit History`,

				showTableContents: false
			}
		}

		// Type search success
		if ( !_.isEmpty(Dom_InventoryTransactionsRaw.view().find(item => item?.materialSubLot?.code == Dom_MaterialSubLot.view()[0]?.code)) ) {
			return {
				key: "Success",
				loadContainerVisible: true,

				loadBarVisible: false,

				loadTextVisible: true,
				loadTextContent: '' ,

				headerTxtVisible: true,
				headerTxtStatus: `Unit History`,

				showTableContents: true
			}
		}

		// Type search db fail
		if ( !getInventoryTransactionsRaw.responseMeta.isExecutionSuccess || !queryMaterialSubLot.responseMeta.isExecutionSuccess  ) {

			return {
				key: "DBError",
				loadContainerVisible: true,

				loadBarVisible: false,

				loadTextVisible: true,
				loadTextContent: 'Database Error, try again!' ,

				headerTxtVisible: true,
				headerTxtStatus: `Unit History`,

				showTableContents: false
			}
		}



		return {
			key: "edge",
			loadContainerVisible: true,

			loadBarVisible: false,

			loadTextVisible: true,
			loadTextContent: '' ,

			headerTxtVisible: true,
			headerTxtStatus: `Unit History`,

			showTableContents: false
		}

	},
}