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

function* foo() {
	try {
		try {
			yield bar;
		} catch (err) {
			if (err instanceof _GeneratorPrototype._Return) return err.value;

			err;
		}

		function inner() {
			try {
				ok;
			} catch (err) {
				err;
			}
		}
	} catch (e) {
		if (e instanceof _GeneratorPrototype._Return) return e.value;
	}
}
