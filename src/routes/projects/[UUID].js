import { baseUrl } from '../../lib';

/** @type {import('./__types/[UUID]').RequestHandler} */
export async function get({ params }) {
	const { UUID } = params;
	let project;
	let url = `${baseUrl}/project/${UUID}`;
	const results = await fetch(url);

	if (results.ok) {
		project = await results.json();
		return {
			body: { project }
		};
	}

	return {
		status: 404
	};
}
