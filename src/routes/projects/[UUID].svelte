<script>
	import { FormProject } from '../../components/forms';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { crumbs, session, baseUrl, buildHeaders, flash } from '../../lib';
	export /**
	 * @type {{ Name: string; Details: string; UUID: string; }}
	 */
	let project;

	let trail = [
		{ text: 'Home', href: '/' },
		{ text: 'Projects', href: '/projects' },
		{ text: project.Name }
	];
	crumbs.set(trail);

	/**
	 * @type {{ Token?: any; } | undefined}
	 */
	let currentUser;
	session.subscribe((value) => {
		currentUser = value;
	});

	const updateProject = async () => {
		const url = `${baseUrl}/project/${project.UUID}`;
		const headers = buildHeaders(currentUser);
		const results = await fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(project),
			headers
		});
		if (results.ok) {
			const updated = await results.json();
			flash.set({
				visible: true,
				message: `Updated: ${updated.Name}`
			});
			window.location.href = '/projects';
		}
	};
</script>

<Card>
	<Content>
		<FormProject {project} />
	</Content>
	<Actions fullBleed>
		<Button on:click={updateProject}>
			<Label>Update Project</Label>
			<i class="material-icons" aria-hidden="true">save</i>
		</Button>
	</Actions>
</Card>

<div class="scroll-space" />
