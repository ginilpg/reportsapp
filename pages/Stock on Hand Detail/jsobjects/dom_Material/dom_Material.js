export default {
	refresh: (filter) => adp_Materials.refresh(filter),
	view: (res) => res ?? adp_Materials.view(),
	
	viewList: (res) => this.view(res)?.map(m => ({"label": m?.material?.code, "value": m?.material?.code})),
	
	buildMaterialFilter: (warehouse, owner) => ({
		"warehouse": {"name": warehouse},
		...(owner && {"owner": {"id": owner}}),
		"groupBy": {
			"material": true,
			"warehouse": true,
			...(owner && {"owner": true}),
		},
	}),
}