<script>
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import IconButton, { Icon } from '@smui/icon-button';
	/**
	 * @type {any[]}
	 */
	export let emails = [];
	export let editEmail = (/** @type {any} */ UUID) => {};
	export let deleteEmail = (/** @type {any} */ UUID) => {};
</script>

<DataTable style="width:100%">
	<Head>
		<Row>
			<Cell />
			<Cell>Address</Cell>
			<Cell>Usage</Cell>
			<Cell>Public</Cell>
			<Cell />
		</Row>
	</Head>
	<Body>
		{#each emails as email (email.UUID)}
			<Row>
				<Cell style="width:2em">
					<IconButton on:click={() => editEmail(email.UUID)}>
						<Icon class="material-icons">edit</Icon>
					</IconButton>
				</Cell>
				<Cell>{email.Address}</Cell>
				<Cell>{email.Usage}</Cell>
				<Cell>{email.Public ? 'Yes' : 'No'}</Cell>
				<Cell style="width:2em">
					<IconButton on:click={() => deleteEmail(email.UUID)}>
						<Icon class="material-icons">close</Icon>
					</IconButton>
				</Cell>
			</Row>
		{/each}
	</Body>
</DataTable>
