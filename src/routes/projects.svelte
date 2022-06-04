<script>
	import { onMount } from 'svelte';
	import { baseUrl, crumbs, progress } from '../lib';
	import { CardProject } from '../components/cards';
	import IconButton, { Icon } from '@smui/icon-button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	/**
	 * @type {any[]}
	 */
	let projects = [];
	/**
	 * @type {any[]}
	 */
	let slice = [];
	let currentPage = 1;
	let pageCount = 0;
	let pageLabel = '';
	let perPage = 10;
	let Term = '';
	let searched = false;

	const firstPage = () => {
		currentPage = 1;
		let beginning = (currentPage - 1) * perPage;
		let ending = Math.min(projects.length, beginning + perPage);
		slice = projects.slice(beginning, ending);
		pageLabel = `${beginning + 1} to ${ending} of ${projects.length}`;
	};

	const prevPage = () => {
		if (currentPage > 1) {
			currentPage--;
			let beginning = (currentPage - 1) * perPage;
			let ending = Math.min(projects.length, beginning + perPage);
			slice = projects.slice(beginning, ending);
			pageLabel = `${beginning + 1} to ${ending} of ${projects.length}`;
		}
	};

	const nextPage = () => {
		if (currentPage < pageCount) {
			currentPage++;
			let beginning = (currentPage - 1) * perPage;
			let ending = Math.min(projects.length, beginning + perPage);
			slice = projects.slice(beginning, ending);
			pageLabel = `${beginning + 1} to ${ending} of ${projects.length}`;
		}
	};

	const lastPage = () => {
		currentPage = pageCount;
		let beginning = (currentPage - 1) * perPage;
		let ending = Math.min(projects.length, beginning + perPage);
		slice = projects.slice(beginning, ending);
		pageLabel = `${beginning + 1} to ${ending} of ${projects.length}`;
	};

	const searchProjects = () => {
		console.log('searchProjects');
		if (Term) {
			searched = true;
		}
	};

	const clearSearch = () => {
		console.log('clearSearch');
		Term = '';
		if (searched) {
			searched = false;
			loadProjects();
		}
	};

	const loadProjects = async () => {
		progress.set(true);
		let url = `${baseUrl}/project`;
		const results = await fetch(url);
		if (results.ok) {
			projects = await results.json();
			pageCount = projects.length ? Math.ceil(projects.length / perPage) : 0;
			let beginning = 0;
			let ending = Math.min(projects.length, beginning + perPage);
			slice = projects.slice(beginning, ending);
			pageLabel = `${beginning + 1} to ${ending} of ${projects.length}`;
			progress.set(false);
		}
	};

	let trail = [{ text: 'Home', href: '/' }, { text: 'Projects' }];
	crumbs.set(trail);

	onMount(() => {
		loadProjects();
	});
</script>

<svelte:head>
	<title>Issue Tracker in Svelte | Projects</title>
</svelte:head>

<LayoutGrid>
	<Cell span={1}>
		<IconButton href="/projects/new" title="Add a New Project">
			<Icon class="material-icons">add_circle_outline</Icon>
		</IconButton>
	</Cell>
	<Cell span={5}>
		<div style="float:left; margin-right: 0.25em;">
			<Textfield label="Search" bind:value={Term} variant="outlined">
				<HelperText slot="helper">Enter Search Term</HelperText>
			</Textfield>
		</div>
		<div style="float:left">
			<IconButton on:click={searchProjects} title="Search Projects">
				<Icon class="material-icons">search</Icon>
			</IconButton>
			<IconButton on:click={clearSearch} title="Clear Search">
				<Icon class="material-icons">refresh</Icon>
			</IconButton>
		</div>
	</Cell>
	<Cell span={1}>
		<IconButton disabled={currentPage == 1} on:click={firstPage} title="First Page">
			<Icon class="material-icons">first_page</Icon>
		</IconButton>
	</Cell>
	<Cell span={1}>
		<IconButton disabled={currentPage == 1} on:click={prevPage} title="Previous Page">
			<Icon class="material-icons">chevron_left</Icon>
		</IconButton>
	</Cell>
	<Cell span={2} style="padding-top:1em; text-align: center;">
		<strong>Showing</strong>
		{pageLabel}
	</Cell>
	<Cell span={1}>
		<IconButton disabled={currentPage >= pageCount} on:click={nextPage} title="Next Page">
			<Icon class="material-icons">chevron_right</Icon>
		</IconButton>
	</Cell>
	<Cell span={1}>
		<IconButton disabled={currentPage >= pageCount} on:click={lastPage} title="Last Page">
			<Icon class="material-icons">last_page</Icon>
		</IconButton>
	</Cell>
</LayoutGrid>

{#each slice as project (project.Id)}
	<CardProject {project} />
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
