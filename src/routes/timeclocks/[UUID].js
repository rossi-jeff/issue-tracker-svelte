// @ts-nocheck
import { baseUrl } from '../../lib';

/** @type {import('./__types/[UUID]').RequestHandler} */
export async function get({ params }) {
	const { UUID } = params;
	let timeclock;
	let url = `${baseUrl}/timeclock/${UUID}`;
	const results = await fetch(url);

	if (results.ok) {
		timeclock = await results.json();
		return {
			body: { timeclock }
		};
	}

	return {
		status: 404
	};
}
