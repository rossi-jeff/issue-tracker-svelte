<script>
	import { FormProject } from '../../components/forms';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { crumbs, baseUrl, buildHeaders, session, flash } from '../../lib';
	let project = {
		Name: '',
		Details: ''
	};

	const saveProject = async () => {
		const url = `${baseUrl}/project`;
		const headers = buildHeaders(currentUser);
		const results = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(project),
			headers
		});
		if (results.ok) {
			const saved = await results.json();
			flash.set({
				visible: true,
				message: `Saved: ${saved.Name}`
			});
			window.location.href = '/projects';
		}
	};

	let trail = [
		{ text: 'Home', href: '/' },
		{ text: 'Projects', href: '/projects' },
		{ text: 'New Project' }
	];
	crumbs.set(trail);

	/**
	 * @type {{ Token?: any; } | undefined}
	 */
	let currentUser;
	session.subscribe((value) => {
		currentUser = value;
	});
</script>

<Card>
	<Content>
		<FormProject {project} />
	</Content>
	<Actions fullBleed>
		<Button on:click={saveProject}>
			<Label>Save Project</Label>
			<i class="material-icons" aria-hidden="true">save</i>
		</Button>
	</Actions>
</Card>

<div class="scroll-space" />
