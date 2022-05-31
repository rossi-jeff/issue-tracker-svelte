<script>
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import IconButton, { Icon } from '@smui/icon-button';
	import Select, { Option } from '@smui/select';
	import { FormatName, GetHours } from '../../lib';
	import { Label } from '@smui/common';
	export /**
	 * @type {any[]}
	 */
	let timeclocks = [];
	export let deleteClock = (/** @type {any} */ UUID) => {};

	let rowsPerPage = 10;
	let currentPage = 0;

	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, timeclocks.length);
	$: slice = timeclocks.slice(start, end);
	$: lastPage = Math.max(Math.ceil(timeclocks.length / rowsPerPage) - 1, 0);

	$: if (currentPage > lastPage) {
		currentPage = lastPage;
	}
</script>

<DataTable style="width:100%">
	<Head>
		<Row>
			<Cell />
			<Cell>Name</Cell>
			<Cell>Project</Cell>
			<Cell>Issue</Cell>
			<Cell>Start Date</Cell>
			<Cell>Time</Cell>
			<Cell>End Date</Cell>
			<Cell>Time</Cell>
			<Cell>Hours</Cell>
			<Cell />
		</Row>
	</Head>
	<Body>
		{#each slice as clock (clock.Id)}
			<Row>
				<Cell style="width:2em">
					<IconButton href="/timeclocks/{clock.UUID}">
						<Icon class="material-icons">edit</Icon>
					</IconButton>
				</Cell>
				<Cell class="ellipsis">
					{#if clock.User}
						{FormatName(clock.User.Name)}
					{/if}
				</Cell>
				<Cell class="ellipsis">
					{#if clock.Project}
						{clock.Project.Name}
					{/if}
				</Cell>
				<Cell class="ellipsis">
					{#if clock.Issue}
						{clock.Issue.Title}
					{/if}
				</Cell>
				<Cell>{clock.Start.Date}</Cell>
				<Cell>{clock.Start.Time}</Cell>
				<Cell>{clock.End.Date}</Cell>
				<Cell>{clock.End.Time}</Cell>
				<Cell>{GetHours(clock)}</Cell>
				<Cell style="width:2em">
					<IconButton on:click={() => deleteClock(clock.UUID)}>
						<Icon class="material-icons">close</Icon>
					</IconButton>
				</Cell>
			</Row>
		{/each}
	</Body>
	<Pagination slot="paginate">
		<svelte:fragment slot="rowsPerPage">
			<Label>Rows Per Page</Label>
			<Select variant="outlined" bind:value={rowsPerPage} noLabel>
				<Option value={10}>10</Option>
				<Option value={25}>25</Option>
				<Option value={50}>50</Option>
			</Select>
		</svelte:fragment>

		<svelte:fragment slot="total">
			{start + 1} to {end} of {timeclocks.length}
		</svelte:fragment>

		<IconButton
			class="material-icons"
			action="first-page"
			title="First page"
			on:click={() => (currentPage = 0)}
			disabled={currentPage === 0}>first_page</IconButton
		>
		<IconButton
			class="material-icons"
			action="prev-page"
			title="Prev page"
			on:click={() => currentPage--}
			disabled={currentPage === 0}>chevron_left</IconButton
		>

		<IconButton
			class="material-icons"
			action="next-page"
			title="Next page"
			on:click={() => currentPage++}
			disabled={currentPage === lastPage}>chevron_right</IconButton
		>
		<IconButton
			class="material-icons"
			action="last-page"
			title="Last page"
			on:click={() => (currentPage = lastPage)}
			disabled={currentPage === lastPage}>last_page</IconButton
		>
	</Pagination>
</DataTable>
