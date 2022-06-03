<script>
	export /**
	 * @type {{ Name: any; Details: any; UUID: any; }}
	 */
	let project;
	import Card, { Content, Actions } from '@smui/card';
	import IconButton, { Icon } from '@smui/icon-button';
</script>

<Card variant="outlined" padded>
	<Content>
		<h4>{project.Name}</h4>
		<div>{project.Details}</div>
	</Content>
	<Actions>
		<IconButton href="/projects/{project.UUID}" title="Edit Project: {project.Name}">
			<Icon class="material-icons">edit</Icon>
		</IconButton>
	</Actions>
</Card>
