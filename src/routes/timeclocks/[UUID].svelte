<script>
	import { FormTimeClock } from '../../components/forms';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { crumbs, baseUrl, buildHeaders, session, flash, progress } from '../../lib';
	export /**
	 * @type {{ UUID?: any; Issue?: { Id: any; } | undefined; IssueId?: number; Project?: { Id: any; } | undefined; ProjectId?: any; User?: { Id: any; } | undefined; UserId?: any; Start?: { Date?: string; Time?: string; }; End?: { Date?: string; Time?: string; }; }}
	 */
	let timeclock;

	let trail = [
		{ text: 'Home', href: '/' },
		{ text: 'Time Clocks', href: '/timeclocks' },
		{ text: 'Edit Time Clock' }
	];
	crumbs.set(trail);

	/**
	 * @type {{ Token?: any; } | undefined}
	 */
	let currentUser;
	session.subscribe((value) => {
		currentUser = value;
	});

	const updateTimeClock = async () => {
		console.log(timeclock);
		progress.set(true);
		const url = `${baseUrl}/timeclock/${timeclock.UUID}`;
		const headers = buildHeaders(currentUser);
		const results = await fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(timeclock),
			headers
		});
		if (results.ok) {
			flash.set({ visible: true, message: 'Time Clock Updated' });
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
		<Button on:click={updateTimeClock}>
			<Label>Update Time Clock</Label>
			<i class="material-icons" aria-hidden="true">save</i>
		</Button>
	</Actions>
</Card>
