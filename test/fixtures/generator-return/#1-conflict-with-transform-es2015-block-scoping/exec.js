function *mapi(next) {
	const ctx = this;
	this.mapi = {
		invoke: co.wrap(function *invode(moduleName, params = {}) {
			const module = modules[moduleName];
			if (!module) {
				ctx.throw('error', {retCode: 100004});
			}
		})
	};
	yield *next;
}
