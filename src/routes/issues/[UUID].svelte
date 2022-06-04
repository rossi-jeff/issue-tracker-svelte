<script>
	import { FormIssue } from '../../components/forms';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { crumbs, baseUrl, buildHeaders, session, flash, progress } from '../../lib';
	export /**
	 * @type {{ SequenceNumber?: any; UUID?: any; Project?: { Id?: any; } | undefined; ProjectId?: any; AssignedTo?: { Id?: any; } | undefined; AssignedToId?: any; Title?: string | number | null | undefined; Details?: string | number | null | undefined; Priority?: any; Status?: any; Type?: any; Complexity?: any; }}
	 */
	let issue;

	let trail = [
		{ text: 'Home', href: '/' },
		{ text: 'Issues', href: '/issues' },
		{ text: issue.SequenceNumber }
	];
	crumbs.set(trail);

	/**
	 * @type {{ Token?: any; } | undefined}
	 */
	let currentUser;
	session.subscribe((value) => {
		currentUser = value;
	});

	const updateIssue = async () => {
		progress.set(true); // navigation will close
		const url = `${baseUrl}/issue/${issue.UUID}`;
		const headers = buildHeaders(currentUser);
		const results = await fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(issue),
			headers
		});
		if (results.ok) {
			const updated = await results.json();
			flash.set({
				visible: true,
				message: `Updated: ${updated.Title}`
			});
			window.location.href = '/issues';
		} else {
			console.log(results);
		}
	};
</script>

<Card>
	<Content>
		<FormIssue {issue} />
	</Content>
	<Actions fullBleed>
		<Button on:click={updateIssue}>
			<Label>Update Issue</Label>
			<i class="material-icons" aria-hidden="true">save</i>
		</Button>
	</Actions>
</Card>

<div class="scroll-space" />
