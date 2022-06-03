import { baseUrl } from '../../lib';

/** @type {import('./__types/[UUID]').RequestHandler} */
export async function get({ params }) {
	const { UUID } = params;
	let user;
	let url = `${baseUrl}/user/${UUID}`;
	const results = await fetch(url);

	if (results.ok) {
		user = await results.json();
		return {
			body: { user }
		};
	}

	return {
		status: 404
	};
}
