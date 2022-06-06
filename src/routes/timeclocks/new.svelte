<script>
	import { FormTimeClock } from '../../components/forms';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { crumbs, baseUrl, buildHeaders, session, flash, progress } from '../../lib';

	let timeclock = {
		UserId: 0,
		ProjectId: 0,
		IssueId: 0,
		Start: {
			Date: '',
			Time: ''
		},
		End: {
			Date: '',
			Time: ''
		}
	};

	let trail = [
		{ text: 'Home', href: '/' },
		{ text: 'Time Clocks', href: '/timeclocks' },
		{ text: 'New Time Clock' }
	];
	crumbs.set(trail);

	/**
	 * @type {{ Token?: any; } | undefined}
	 */
	let currentUser;
	session.subscribe((value) => {
		currentUser = value;
	});

	const saveTimeClock = async () => {
		progress.set(true);
		const url = `${baseUrl}/timeclock`;
		const headers = buildHeaders(currentUser);
		const results = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(timeclock),
			headers
		});
		if (results.ok) {
			flash.set({ visible: true, message: 'Time Clock Saved' });
			progress.set(false);
			window.location.href = '/timeclocks';
		}
	};
</script>

<Card>
	<Content>
		<FormTimeClock {timeclock} />
	</Content>
	<Actions fullBleed>
		<Button on:click={saveTimeClock}>
			<Label>Save Time Clock</Label>
			<i class="material-icons" aria-hidden="true">save</i>
		</Button>
	</Actions>
</Card>
