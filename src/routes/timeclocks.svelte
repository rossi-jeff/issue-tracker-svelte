<script>
	import { onMount } from 'svelte';
	import { baseUrl, crumbs } from '../lib';
	import { TableTimeClock } from '../components/tables';
	import IconButton, { Icon } from '@smui/icon-button';
	import { FilterTimeClock } from '../components/filters';
	import Card, { Content } from '@smui/card';

	/**
	 * @type {any[]}
	 */
	let timeclocks = [];
	let filterAction = (/** @type {any} */ params) => {
		console.log('filterAction', params);
	};

	let trail = [{ text: 'Home', href: '/' }, { text: 'Time Clocks' }];
	crumbs.set(trail);

	onMount(async () => {
		let url = `${baseUrl}/timeclock`;
		const results = await fetch(url);
		if (results.ok) {
			timeclocks = await results.json();
		}
	});
</script>

<svelte:head>
	<title>Issue Tracker in Svelte | Time Clocks</title>
</svelte:head>

<Card style="z-index: 9999;">
	<Content>
		<IconButton href="/timeclocks/new" title="Add a New Time Clock">
			<Icon class="material-icons">add_circle_outline</Icon>
		</IconButton>

		<FilterTimeClock {filterAction} />
	</Content>
</Card>

<TableTimeClock {timeclocks} />
