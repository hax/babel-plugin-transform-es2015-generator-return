function * foo() {
	try {
		yield bar
	} catch (err) {
		err
	}

	function inner() {
		try {
			ok
		} catch (err) {
			err
		}
	}
}
