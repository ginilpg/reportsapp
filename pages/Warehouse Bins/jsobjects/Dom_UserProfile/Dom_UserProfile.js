export default {
	libreAppRoles: () => {
		return appsmith.user.idToken.resource_access.libreApp.roles.map((item)=>({"label":item, "value":item}))
	},
	libreAppRoleList: () => {
		return appsmith.user.idToken.resource_access.libreApp.roles
	},
	test: () => {
		return appsmith.user.idToken.resource_access
	}
}