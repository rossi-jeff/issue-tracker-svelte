<script>
	import { onMount } from 'svelte';
	import { baseUrl, crumbs, progress, session } from '../lib';
	import { TableTimeClock } from '../components/tables';
	import IconButton, { Icon } from '@smui/icon-button';
	import { FilterTimeClock } from '../components/filters';
	import Card, { Content } from '@smui/card';

	/**
	 * @type {any[]}
	 */
	let timeclocks = [];
	let filterAction = (/** @type {any} */ params) => {
		progress.set(true);
		const url = new URL(`${baseUrl}/timeclock`);
		for (const key in params) {
			if (params[key]) {
				url.searchParams.append(key, params[key]);
			}
		}
		fetch(url.toString())
			.then((results) => results.json())
			.then((data) => {
				timeclocks = data;
				progress.set(false);
			});
	};

	let trail = [{ text: 'Home', href: '/' }, { text: 'Time Clocks' }];
	crumbs.set(trail);

	/**
	 * @type {{ signedIn: any; Name?: string; UserName?: string; Token?: string; UUID?: string; SessionId?: string; }}
	 */
	let currentUser;
	session.subscribe((value) => {
		currentUser = value;
	});

	onMount(() => {
		progress.set(true);
		let url = `${baseUrl}/timeclock`;
		fetch(url)
			.then((results) => results.json())
			.then((data) => {
				timeclocks = data;
				progress.set(false);
			});
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

<TableTimeClock {timeclocks} enabled={currentUser.signedIn} />

<div class="scroll-space" />
