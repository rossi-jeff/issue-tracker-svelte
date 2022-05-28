// @ts-nocheck
import { baseUrl } from '../../lib';

/** @type {import('./__types/[UUID]').RequestHandler} */
export async function get({ params }) {
  const { UUID } = params;
  let issue
  let url = `${baseUrl}/issue/${UUID}`;
  const results = await fetch(url);

  if (results.ok) {
    issue = await results.json()
    return {
      body: { issue }
    }
  }

  return {
    status: 404
  }
}