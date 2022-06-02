<script>
	import { FormTimeClock } from '../../components/forms';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { crumbs } from '../../lib';
	export /**
	 * @type {{ UserId: any; ProjectId: any; IssueId: any; Start: { Date: string | number | null | undefined; Time: string | number | null | undefined; }; End: { Date: string | number | null | undefined; Time: string | number | null | undefined; }; }}
	 */
	let timeclock;

	let trail = [
		{ text: 'Home', href: '/' },
		{ text: 'Time Clocks', href: '/timeclocks' },
		{ text: 'Edit Time Clock' }
	];
	crumbs.set(trail);

	const clicked = () => {
		console.log(timeclock);
	};
</script>

<Card>
	<Content>
		<FormTimeClock {timeclock} />
	</Content>
	<Actions fullBleed>
		<Button on:click={clicked}>
			<Label>Update Time Clock</Label>
			<i class="material-icons" aria-hidden="true">save</i>
		</Button>
	</Actions>
</Card>
