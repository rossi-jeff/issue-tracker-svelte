<script>
	import { FormIssue } from '../../components/forms';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { crumbs } from '../../lib';
	export /**
	 * @type {{ SequenceNumber?: any; Title?: string; Details?: string; ProjectId?: number; AssignedToId?: number; Priority?: string; Status?: string; Type?: string; Complexity?: string; Project?: { Id?: number | undefined; } | undefined; AssignedTo?: { Id?: number | undefined; } | undefined; }}
	 */
	let issue;

	let trail = [
		{ text: 'Home', href: '/' },
		{ text: 'Issues', href: '/issues' },
		{ text: issue.SequenceNumber }
	];
	crumbs.set(trail);

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
