import template from 'babel-template'

const patch = template(`
	const GENERATOR_PROTOTYPE = Object.getPrototypeOf(function * () {}.prototype)
	if (!GENERATOR_PROTOTYPE.return) {
		GENERATOR_PROTOTYPE._Return = class Return {
			constructor(value) { this.value = value }
		}
		GENERATOR_PROTOTYPE.return = function (value) {
			const r = new this._Return(value)
			try {
				return this.throw(r)
			} catch (e) {
				// assert e === r
				return {done: true, value: value}
			}
		}
	}
`)

const wrap = template(`
	{
		try {
			BODY
		} catch (e) {
			if (e instanceof GENERATOR_PROTOTYPE._Return) return e.value
		}
	}
`)

const checkReturn = template(`
	if (ERROR instanceof GENERATOR_PROTOTYPE._Return) return ERROR.value
`)
const catchReturn = {
	CatchClause(path) {
		path.get('body').unshiftContainer('body', checkReturn({...this.bindings, ERROR: path.node.param}))
	},
	Function(path) {
		path.skip()
	}
}
const wrapGeneratorBody = {
	Function(path) {
		if (path.node.generator) {
			path.get('body').traverse(catchReturn, this)
			path.get('body').replaceWith(wrap({...this.bindings, BODY: path.node.body.body}))
			this.wrapped = true
		}
	}
}

export default function (t) {
	return {
		visitor: {
			Program(path) {
				const bindings = {
					GENERATOR_PROTOTYPE: path.scope.generateUidIdentifier('GeneratorPrototype')
				}
				const ctx = {wrapped: false, bindings}
				path.traverse(wrapGeneratorBody, ctx)
				if (ctx.wrapped) {
					path.unshiftContainer('body', patch(bindings))
				}
			}
		}
	}
}
