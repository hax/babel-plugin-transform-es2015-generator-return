import template from 'babel-template'

const patch = template(`
	const _GeneratorPrototype = Object.getPrototypeOf(function * () {}.prototype)
	if (!_GeneratorPrototype.return) {
		_GeneratorPrototype._Return = class Return {
			constructor(value) { this.value = value }
		}
		_GeneratorPrototype.return = function (value) {
			return this.throw(new this._Return(value))
		}
	}
`)

const wrap = template(`
	{
		try {
			BODY
		} catch (e) {
		}
	}
`)

const checkReturn = template(`
	if (ERROR instanceof _GeneratorPrototype._Return) return ERROR.value
`)

export default function () {
	return {
		visitor: {
			Function(path, state) {
				if (state.end) return
				if (path.node.generator) {
					state.haveGenerators = true
					path.get('body').replaceWith(wrap({BODY: path.node.body.body}))
				}
			},
			CatchClause(path, state) {
				if (state.end) return
				if (path.scope.getFunctionParent().block.generator) {
					// console.log('enter catch', path.getSource())
					path.get('body').unshiftContainer('body', checkReturn({ERROR: path.node.param}))
				}
			},
			Program: {
				exit(path, state) {
					// console.log('exit program')
					state.end = true
					if (state.haveGenerators) {
						path.scope.rename('_GeneratorPrototype')
						path.unshiftContainer('body', patch())
					}
				}
			}
		}
	}
}
