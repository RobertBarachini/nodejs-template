import { asyncWrapper } from './generic.js'

/**
 * Wrapper for the fetch API to make requests
 *
 * NOTE: Fetch API's response's body is a stream, so you have to use response.text() or response.json() which both return a promise
 *
 * @param {Object} options
 * @param {string} options.method
 * @param {string} options.url
 * @param {Object} options.headers
 * @param {Object} options.body
 * @returns {Promise<[any, Error]>} Returns the promise which resolves to an array with the response and error
 * @example
 * const [response, error] = await makeRequest({
 * 	method: 'GET',
 * 	url: 'https://www.google.com',
 * });
 * if (error) {
 * 	console.log(error);
 * 	return;
 * }
 * console.log(response);
 */
const makeRequest = async (options) => {
	return asyncWrapper(fetch, options.url, options)
}

// eslint-disable-next-line no-unused-vars
const exampleMakeRequestWithWrapper = async () => {
	// Options are the same as the options for Got library, however we may use
	// the same parameters even after switching to a different library for consistency
	// makeRequest servers as a wrapper for the library we use to make requests (translation layer)
	const [response, error] = await makeRequest({
		method: 'GET',
		url: 'https://www.google.com',
	})
	if (error) {
		console.log(error)
		return
	}
	const responseText = await response.text()
	// If response is of type JSON, you can use response.json()
	console.log(`Response text: '${responseText}'`)
}
// exampleMakeRequestWithWrapper()

// eslint-disable-next-line no-unused-vars
const exampleMakeRequestWithoutWrapper = async () => {
	// Here we see that the proper way of handling errors is to use try/catch blocks which
	// add a lot of indentation to the code. We also have to use a let keyword instead of
	// const which may lead to future variable reassignment which may not be desired behavior.
	// This is why we use the wrapper functions.
	let response
	try {
		response = await fetch('https://www.google.com', {
			method: 'GET',
		})
		const responseText = await response.text()
		// If response is of type JSON, you can use response.json()
		console.log(`Response text: '${responseText}'`)
	} catch (error) {
		console.log(error)
	}
}
// exampleMakeRequestWithoutWrapper()

export { makeRequest }
