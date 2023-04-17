export default {
	user: () => appsmith.user,
	libreApp: () => this.user()?.idToken?.resource_access?.libreApp,
	libreAppRoles: () => this.libreApp()?.roles,
	libreAppRoleList: () => this.libreAppRoles()?.map(r => ({"label": r, "value": r}))
}