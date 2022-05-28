<script>
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Select, { Option } from '@smui/select';
	import { onMount } from 'svelte';
	import { baseUrl, PriorityArray, StatusArray, IssueTypeArray, ComplexityArray } from '../../lib';
	export /**
	 * @type {{ Title: string; Details: string; ProjectId: number; AssignedToId: number; Priority: string; Status: string; Type: string; Complexity: string; Project?: { Id?: number; }; AssignedTo?: { Id?: number; } }}
	 */
	let issue;
	/**
	 * @type {any[]}
	 */
	let projects = [];
	/**
	 * @type {any[]}
	 */
	let users = [];

	onMount(async () => {
		if (issue.Project && issue.Project.Id && !issue.ProjectId) {
			issue.ProjectId = issue.Project.Id;
		}
		let url = `${baseUrl}/project`;
		let results = await fetch(url);
		if (results.ok) {
			projects = await results.json();
		}
		url = `${baseUrl}/user`;
		results = await fetch(url);
		if (results.ok) {
			users = await results.json();
		}
		if (issue.AssignedTo && issue.AssignedTo.Id && !issue.AssignedToId) {
			issue.AssignedToId = issue.AssignedTo.Id;
		}
	});
</script>

<div style="margin-bottom: 0.5em">
	<Select bind:value={issue.ProjectId} label="Project" style="width:100%">
		{#each projects as project}
			<Option value={project.Id}>{project.Name}</Option>
		{/each}
	</Select>
</div>

<div style="margin-bottom: 0.5em">
	<Textfield
		style="width: 100%;"
		helperLine$style="width: 100%;"
		bind:value={issue.Title}
		label="Title"
	>
		<HelperText slot="helper">Enter Issue Title</HelperText>
	</Textfield>
</div>

<div style="margin-bottom: 0.5em">
	<Textfield
		style="width: 100%;"
		helperLine$style="width: 100%;"
		textarea
		bind:value={issue.Details}
		label="Details"
	>
		<HelperText slot="helper">Enter Issue Details</HelperText>
	</Textfield>
</div>

<LayoutGrid>
	<Cell>
		<Select label="Priority" style="width:100%" bind:value={issue.Priority}>
			{#each PriorityArray as priority}
				<Option value={priority}>{priority}</Option>
			{/each}
		</Select>
	</Cell>
	<Cell>
		<Select label="Status" style="width:100%" bind:value={issue.Status}>
			{#each StatusArray as status}
				<Option value={status}>{status}</Option>
			{/each}
		</Select>
	</Cell>
	<Cell>
		<Select label="Type" style="width:100%" bind:value={issue.Type}>
			{#each IssueTypeArray as type}
				<Option value={type}>{type}</Option>
			{/each}
		</Select>
	</Cell>
	<Cell>
		<Select label="Complexity" style="width:100%" bind:value={issue.Complexity}>
			{#each ComplexityArray as complexity}
				<Option value={complexity}>{complexity}</Option>
			{/each}
		</Select>
	</Cell>
	<Cell>
		<Select bind:value={issue.AssignedToId} label="Assigned" style="width:100%">
			{#each users as user}
				<Option value={user.Id}>{user.Name.First} {user.Name.Last}</Option>
			{/each}
		</Select>
	</Cell>
</LayoutGrid>
