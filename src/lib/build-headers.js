export const buildHeaders = (/** @type {{ Token?: any; }} */ session = {}) => {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	};
	if (session.Token) {
		// @ts-ignore
		headers.Authorization = `Bearer ${session.Token}`;
	}
	return headers;
};
