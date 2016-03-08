const _GeneratorPrototype = Object.getPrototypeOf(function* () {}.prototype);

if (!_GeneratorPrototype.return) {
	_GeneratorPrototype._Return = class Return {
		constructor(value) {
			this.value = value;
		}

	};

	_GeneratorPrototype.return = function (value) {
		const r = new this._Return(value);

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

function outer() {
	return function* () {
		try {
			yield function inner() {
				try {
					ok;
				} catch (e) {
					return function* () {
						try {
							try {
								let i = 0;
								while (true) yield ++i;
							} catch (e) {
								if (e instanceof _GeneratorPrototype._Return) return e.value;

								e;
							}
						} catch (e) {
							if (e instanceof _GeneratorPrototype._Return) return e.value;
						}
					};
				}
			};
		} catch (e) {
			if (e instanceof _GeneratorPrototype._Return) return e.value;
		}
	};
}
