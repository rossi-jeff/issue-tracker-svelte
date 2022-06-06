<script>
	// import IconButton, { Icon } from '@smui/icon-button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Select, { Option } from '@smui/select';
	import { onMount } from 'svelte';
	import { baseUrl, clone } from '../../lib';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import Button, { Label } from '@smui/button';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	/**
	 * @type {any[]}
	 */
	let users = [];
	/**
	 * @type {any[]}
	 */
	let projects = [];
	/**
	 * @type {any[]}
	 */
	let issues = [];
	const blank = {
		UserId: 0,
		ProjectId: 0,
		IssueId: 0,
		StartDate: '',
		EndDate: ''
	};
	let filter = clone(blank);
	/**
	 * @type {NodeJS.Timeout | null | undefined}
	 */
	let timeout = null;

	const filtersChanged = (/** @type {any} */ e) => {
		if (
			(e.type == 'click' && e.target && e.target.dataset && e.target.dataset.value != undefined) ||
			(e.type == 'blur' && e.detail && e.detail.target && e.detail.target.value)
		) {
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(async () => {
				filterAction(clone(filter));
			}, 100);
		}
	};

	const clearFilters = () => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			filter = clone(blank);
			filterAction(clone(filter));
		}, 100);
	};

	export let filterAction = (/** @type {any} */ params) => {};

	onMount(async () => {
		let url, results;
		url = `${baseUrl}/user`;
		results = await fetch(url);
		if (results.ok) {
			users = await results.json();
		}
		url = `${baseUrl}/project`;
		results = await fetch(url);
		if (results.ok) {
			projects = await results.json();
		}
		url = `${baseUrl}/issue`;
		results = await fetch(url);
		if (results.ok) {
			issues = await results.json();
		}
	});
</script>

<Accordion>
	<Panel>
		<Header>Filter Time Clocks</Header>
		<Content>
			<LayoutGrid>
				<Cell>
					<Select
						bind:value={filter.UserId}
						label="User"
						style="width:100%"
						on:click={filtersChanged}
					>
						<Option value={0}>-- Select User --</Option>
						{#each users as user}
							<Option value={user.Id}>{user.Name.First} {user.Name.Last}</Option>
						{/each}
					</Select>
				</Cell>
				<Cell>
					<Select
						label="Project"
						style="width:100%"
						bind:value={filter.ProjectId}
						on:click={filtersChanged}
					>
						<Option value={0}>-- Select Project --</Option>
						{#each projects as project}
							<Option value={project.Id}>{project.Name}</Option>
						{/each}
					</Select>
				</Cell>
				<Cell>
					<Select
						label="Issue"
						style="width:100%"
						bind:value={filter.IssueId}
						on:click={filtersChanged}
					>
						<Option value={0}>-- Select Issue --</Option>
						{#each issues as issue}
							<Option value={issue.Id}>{issue.Title}</Option>
						{/each}
					</Select>
				</Cell>
				<Cell>
					<Textfield
						style="width: 100%;"
						helperLine$style="width: 100%;"
						label="Start Date"
						type="date"
						bind:value={filter.StartDate}
						on:blur={filtersChanged}
					>
						<HelperText slot="helper">Enter Issue Details</HelperText>
					</Textfield>
				</Cell>
				<Cell>
					<Textfield
						style="width: 100%;"
						helperLine$style="width: 100%;"
						label="End Date"
						type="date"
						bind:value={filter.EndDate}
						on:blur={filtersChanged}
					>
						<HelperText slot="helper">Enter Issue Details</HelperText>
					</Textfield>
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
