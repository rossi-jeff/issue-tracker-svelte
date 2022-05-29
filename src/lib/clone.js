export const clone = (/** @type {any} */ obj) => {
	return JSON.parse(JSON.stringify(obj));
};
