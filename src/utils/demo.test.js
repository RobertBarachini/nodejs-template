import assert from 'node:assert/strict'

import { describe, it } from 'mocha'

import { sum } from './demo.js'

// Alternative import syntax:
// import { sum } from '#utils/demo.js'

describe('sum', () => {
	it('should return the sum of two numbers', () => {
		assert.strictEqual(sum(1, 2), 3)
	})
})
