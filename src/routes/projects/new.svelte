<script>
	import { FormProject } from '../../components/forms';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { crumbs } from '../../lib';
	let project = {
		Name: '',
		Details: ''
	};

	let trail = [
		{ text: 'Home', href: '/' },
		{ text: 'Projects', href: '/projects' },
		{ text: 'New Project' }
	];
	crumbs.set(trail);

	const clicked = () => {
		console.log(project);
	};
</script>

<Card>
	<Content>
		<FormProject {project} />
	</Content>
	<Actions fullBleed>
		<Button on:click={clicked}>
			<Label>Save Project</Label>
			<i class="material-icons" aria-hidden="true">save</i>
		</Button>
	</Actions>
</Card>
