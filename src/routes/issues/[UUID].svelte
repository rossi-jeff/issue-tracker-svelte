<script>
	import { FormIssue } from '../../components/forms';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	export /**
	 * @type {{ Title: string; Details: string; ProjectId: number; AssignedToId: number; Priority: string; Status: string; Type: string; Complexity: string; }}
	 */
	let issue;

	const clicked = () => {
		console.log(issue);
	};
</script>

<Card>
	<Content>
		<FormIssue {issue} />
	</Content>
	<Actions fullBleed>
		<Button on:click={clicked}>
			<Label>Update Issue</Label>
			<i class="material-icons" aria-hidden="true">save</i>
		</Button>
	</Actions>
</Card>
