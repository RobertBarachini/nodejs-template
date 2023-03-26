// NOTE: syncWrapper and asyncWrapper are used to enable better syntax when using try/catch blocks
//       it mimics the error handling in GoLang. It is not necessary to use these functions, but
//       they are recommended as they reduce the indentation when using try/catch blocks and allow for
//       cleaner code with early returns.

// For example use look at the implementation of exampleMakeRequestWithWrapper in ./server/main/utils/requests.js

/**
 * Wraps a function in a try/catch block and returns the result or error
 *
 * @param {Function} fn
 * @param  {...any} args
 * @returns {[any, Error]}
 * @example
 * const [result, error] = syncWrapper(someSyncFunction, arg1, arg2, argN);
 */
const syncWrapper = (fn, ...args) => {
	try {
		const result = fn(...args)
		return [result, null]
	} catch (error) {
		return [null, error]
	}
}

/**
 * Wraps a function in a try/catch block and returns the result or error
 *
 * @param {Function} fn
 * @param  {...any} args
 * @returns {[any, Error]}
 * @example
 * const [result, error] = await asyncWrapper(someAsyncFunction, arg1, arg2, argN);
 */
const asyncWrapper = async (fn, ...args) => {
	try {
		const result = await fn(...args)
		return [result, null]
	} catch (error) {
		return [null, error]
	}
}

export { syncWrapper, asyncWrapper }
