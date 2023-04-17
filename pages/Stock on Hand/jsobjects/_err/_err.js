export default {
	fmtErr: (err) => {
		if (Array.isArray(err)) {
			if (err.length == 1) return JSON.stringify(err[0].message)
			return JSON.stringify(err.map(e => e.message))
		} else if (err?.message) return JSON.stringify(err.message)
		else return JSON.stringify(err)
	},

	showErr: (err) => {
		showAlert(this.fmtErr(err), "error")
	},
}