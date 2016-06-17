var _GeneratorPrototype = Object.getPrototypeOf(function* () {}.prototype);

if (!_GeneratorPrototype.return) {
	_GeneratorPrototype._Return = class Return {
		constructor(value) {
			this.value = value;
		}

	};

	_GeneratorPrototype.return = function (value) {
		var r = new this._Return(value);

		try {
			return this.throw(r);
		} catch (e) {
			return {
				done: true,
				value: value
			};
		}
	};
}

function* mapi(next) {
	try {
		var ctx = this;
		this.mapi = {
			invoke: co.wrap(function* invode(moduleName, params = {}) {
				try {
					var module = modules[moduleName];
					if (!module) {
						ctx.throw('error', { retCode: 100004 });
					}
				} catch (e) {
					if (e instanceof _GeneratorPrototype._Return) return e.value;
				}
			})
		};
		yield* next;
	} catch (e) {
		if (e instanceof _GeneratorPrototype._Return) return e.value;
	}
}
