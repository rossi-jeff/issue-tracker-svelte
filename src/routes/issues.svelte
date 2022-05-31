<script>
	import { onMount } from 'svelte';
	import { baseUrl } from '../lib';
	import { CardIssue } from '../components/cards';
	import { FilterIssue } from '../components/filters';
	import Card, { Content } from '@smui/card';
	import IconButton, { Icon } from '@smui/icon-button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	/**
	 * @type {any[]}
	 */
	let issues = [];
	/**
	 * @type {any[]}
	 */
	let slice = [];
	let currentPage = 1;
	let pageCount = 0;
	let pageLabel = '';
	let perPage = 10;

	const filterAction = async (/** @type {any} */ params) => {
		const url = new URL(`${baseUrl}/issue`);
		for (const key in params) {
			if (params[key]) {
				url.searchParams.append(key, params[key]);
			}
		}
		const results = await fetch(url.toString());
		if (results.ok) {
			issues = await results.json();
			pageCount = issues.length ? Math.ceil(issues.length / perPage) : 0;
			let beginning = 0;
			let ending = Math.min(issues.length, beginning + perPage);
			slice = issues.slice(beginning, ending);
			pageLabel = `${beginning + 1} to ${ending} of ${issues.length}`;
		}
	};

	const firstPage = () => {
		currentPage = 1;
		let beginning = (currentPage - 1) * perPage;
		let ending = Math.min(issues.length, beginning + perPage);
		slice = issues.slice(beginning, ending);
		pageLabel = `${beginning + 1} to ${ending} of ${issues.length}`;
	};

	const prevPage = () => {
		if (currentPage > 1) {
			currentPage--;
			let beginning = (currentPage - 1) * perPage;
			let ending = Math.min(issues.length, beginning + perPage);
			slice = issues.slice(beginning, ending);
			pageLabel = `${beginning + 1} to ${ending} of ${issues.length}`;
		}
	};

	const nextPage = () => {
		if (currentPage < pageCount) {
			currentPage++;
			let beginning = (currentPage - 1) * perPage;
			let ending = Math.min(issues.length, beginning + perPage);
			slice = issues.slice(beginning, ending);
			pageLabel = `${beginning + 1} to ${ending} of ${issues.length}`;
		}
	};

	const lastPage = () => {
		currentPage = pageCount;
		let beginning = (currentPage - 1) * perPage;
		let ending = Math.min(issues.length, beginning + perPage);
		slice = issues.slice(beginning, ending);
		pageLabel = `${beginning + 1} to ${ending} of ${issues.length}`;
	};

	onMount(async () => {
		let url = `${baseUrl}/issue`;
		const results = await fetch(url);
		if (results.ok) {
			issues = await results.json();
			pageCount = issues.length ? Math.ceil(issues.length / perPage) : 0;
			currentPage = 1;
			let beginning = (currentPage - 1) * perPage;
			let ending = Math.min(issues.length, beginning + perPage);
			slice = issues.slice(beginning, ending);
			pageLabel = `${beginning + 1} to ${ending} of ${issues.length}`;
		}
	});
</script>

<svelte:head>
	<title>Issue Tracker in Svelte | Issues</title>
</svelte:head>

<Card style="z-index: 9999;">
	<Content>
		<FilterIssue
			{filterAction}
			{currentPage}
			{pageCount}
			{pageLabel}
			{firstPage}
			{prevPage}
			{nextPage}
			{lastPage}
		/>
	</Content>
</Card>

{#each slice as issue}
	<CardIssue {issue} />
{/each}

<LayoutGrid>
	<Cell span={2}>
		<IconButton disabled={currentPage == 1} on:click={firstPage} title="First Page">
			<Icon class="material-icons">first_page</Icon>
		</IconButton>
	</Cell>
	<Cell span={2}>
		<IconButton disabled={currentPage == 1} on:click={prevPage} title="Previous Page">
			<Icon class="material-icons">chevron_left</Icon>
		</IconButton>
	</Cell>
	<Cell span={4} style="padding-top:1em; text-align: center;">
		<strong>Showing</strong>
		{pageLabel}
	</Cell>
	<Cell span={2} style="text-align: right">
		<IconButton disabled={currentPage >= pageCount} on:click={nextPage} title="Next Page">
			<Icon class="material-icons">chevron_right</Icon>
		</IconButton>
	</Cell>
	<Cell span={2} style="text-align: right">
		<IconButton disabled={currentPage >= pageCount} on:click={lastPage} title="Last Page">
			<Icon class="material-icons">last_page</Icon>
		</IconButton>
	</Cell>
</LayoutGrid>
