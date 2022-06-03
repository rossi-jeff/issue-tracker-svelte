<script>
	import { FormIssue } from '../../components/forms';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { crumbs, baseUrl, buildHeaders, session, flash } from '../../lib';
	let issue = {
		Title: '',
		Details: '',
		ProjectId: 0,
		AssignedToId: 0,
		Priority: '',
		Status: '',
		Type: '',
		Complexity: ''
	};

	let trail = [
		{ text: 'Home', href: '/' },
		{ text: 'Issues', href: '/issues' },
		{ text: 'New Issue' }
	];
	crumbs.set(trail);

	/**
	 * @type {{ Token?: any; } | undefined}
	 */
	let currentUser;
	session.subscribe((value) => {
		currentUser = value;
	});

	const saveIssue = async () => {
		const url = `${baseUrl}/issue`;
		const headers = buildHeaders(currentUser);
		const results = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(issue),
			headers
		});
		if (results.ok) {
			const saved = await results.json();
			flash.set({
				visible: true,
				message: `Saved: ${saved.Title}`
			});
			window.location.href = '/issues';
		}
	};
</script>

<Card>
	<Content>
		<FormIssue {issue} />
	</Content>
	<Actions fullBleed>
		<Button on:click={saveIssue}>
			<Label>Save Issue</Label>
			<i class="material-icons" aria-hidden="true">save</i>
		</Button>
	</Actions>
</Card>

<div class="scroll-space" />
