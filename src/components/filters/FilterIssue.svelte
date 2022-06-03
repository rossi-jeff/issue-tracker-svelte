<script>
	import IconButton, { Icon } from '@smui/icon-button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Select, { Option } from '@smui/select';
	import {
		PriorityArray,
		StatusArray,
		IssueTypeArray,
		ComplexityArray,
		baseUrl,
		clone
	} from '../../lib';
	import { onMount } from 'svelte';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	/**
	 * @type {NodeJS.Timeout | null | undefined}
	 */
	let timeout = null;
	let filter = {
		Priority: '',
		Status: '',
		Type: '',
		Complexity: '',
		AuthorId: 0,
		AssignedToId: 0
	};
	/**
	 * @type {any[]}
	 */
	let users = [];
	let Term = '';
	let searched = false;

	const searchIssues = () => {
		console.log('searchIssues');
		if (Term) {
			searched = true;
		}
	};

	const clearSearch = () => {
		console.log('clearSearch');
		Term = '';
		if (searched) {
			searched = false;
		}
	};

	onMount(async () => {
		const url = `${baseUrl}/user`;
		const results = await fetch(url);
		if (results.ok) {
			users = await results.json();
		}
	});
	const filtersChanged = (/** @type {any} */ e) => {
		if (e.target && e.target.dataset && e.target.dataset.value != undefined) {
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(async () => {
				filterAction(clone(filter));
			}, 100);
		}
	};
	const clearFilters = () => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(async () => {
			filter.AssignedToId = 0;
			filter.AuthorId = 0;
			filter.Complexity = '';
			filter.Priority = '';
			filter.Status = '';
			filter.Type = '';
			filterAction(clone(filter));
		}, 100);
	};
	export let filterAction = (/** @type {any} */ params) => {};
	export /**
	 * @type {number}
	 */
	let currentPage;
	export /**
	 * @type {number}
	 */
	let pageCount;
	export /**
	 * @type {any}
	 */
	let pageLabel;
	export let firstPage = () => {};
	export let prevPage = () => {};
	export let nextPage = () => {};
	export let lastPage = () => {};
</script>

<LayoutGrid>
	<Cell span={1}>
		<IconButton href="/issues/new" title="Add a New Issue">
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
			<IconButton on:click={searchIssues} title="Search Issues">
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

<Accordion>
	<Panel>
		<Header>Filter Issues</Header>
		<Content>
			<LayoutGrid>
				<Cell>
					<Select
						label="Priority"
						style="width:100%"
						bind:value={filter.Priority}
						on:click={filtersChanged}
					>
						{#each PriorityArray as priority}
							<Option value={priority}>{priority}</Option>
						{/each}
					</Select>
				</Cell>
				<Cell>
					<Select
						label="Status"
						style="width:100%"
						bind:value={filter.Status}
						on:click={filtersChanged}
					>
						{#each StatusArray as status}
							<Option value={status}>{status}</Option>
						{/each}
					</Select>
				</Cell>
				<Cell>
					<Select
						label="Type"
						style="width:100%"
						bind:value={filter.Type}
						on:click={filtersChanged}
					>
						{#each IssueTypeArray as type}
							<Option value={type}>{type}</Option>
						{/each}
					</Select>
				</Cell>
				<Cell>
					<Select
						label="Complexity"
						style="width:100%"
						bind:value={filter.Complexity}
						on:click={filtersChanged}
					>
						{#each ComplexityArray as complexity}
							<Option value={complexity}>{complexity}</Option>
						{/each}
					</Select>
				</Cell>
				<Cell>
					<Select
						bind:value={filter.AuthorId}
						label="Author"
						style="width:100%"
						on:click={filtersChanged}
					>
						{#each users as user}
							<Option value={user.Id}>{user.Name.First} {user.Name.Last}</Option>
						{/each}
					</Select>
				</Cell>
				<Cell>
					<Select
						bind:value={filter.AssignedToId}
						label="Assigned"
						style="width:100%"
						on:click={filtersChanged}
					>
						{#each users as user}
							<Option value={user.Id}>{user.Name.First} {user.Name.Last}</Option>
						{/each}
					</Select>
				</Cell>
				<Cell>
					<Button on:click={clearFilters}>
						<Label>Clear Filters</Label>
					</Button>
				</Cell>
			</LayoutGrid>
		</Content>
	</Panel>
</Accordion>
