function outer() {
	return function * () {
		yield function inner() {
			try {
				ok
			} catch (e) {
				return function * () {
					try {
						let i = 0
						while (true) yield ++i
					} catch (e) {
						e
					}
				}
			}
		}
	}
}
