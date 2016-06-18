import { join }	from 'path'
import { readdirSync, readFileSync, statSync }	from 'fs'
import { transformFileSync }	from 'babel-core'
import plugin	from '../src'
import assert	from 'assert'

describe('Patch Generator.prototype.return', () => {
	const fixturesDir = join(__dirname, 'fixtures')
	for (const caseName of readdirSync(fixturesDir)) {
		const fixtureDir = join(fixturesDir, caseName)
		if (!statSync(fixtureDir).isDirectory()) continue

		it(`should ${caseName.split('-').join(' ')}`, () => {
			const actualPath = join(fixtureDir, 'actual.js')
			if (existsFile(actualPath)) {
				const actual = transformFileSync(actualPath).code
				const expectedPath = join(fixtureDir, 'expected.js')
				const expected = readFileSync(expectedPath, 'utf-8')

				assert.equal(actual.trim(), expected.trim())
			}
			const execPath = join(fixtureDir, 'exec.js')
			if (existsFile(execPath)) {
				const exec = transformFileSync(execPath).code
				new Function('assert', exec)(assert)
			}
		})
	}
})

function existsFile(path) {
	try {
		return statSync(actualPath).isFile()
	} catch (e) {
		return false
	}
}
