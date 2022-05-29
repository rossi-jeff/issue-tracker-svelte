<script>
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Select, { Option } from '@smui/select';
	import { onMount } from 'svelte';
	import { baseUrl } from '../../lib';
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
	export /**
	 * @type {{ UserId: any; ProjectId: any; IssueId: any; Start: { Date: string | number | null | undefined; Time: string | number | null | undefined; }; End: { Date: string | number | null | undefined; Time: string | number | null | undefined; }; }}
	 */
	let timeclock;
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
			filterIssues(0);
		}
	});
	/**
	 * @type {any[]}
	 */
	let filtered = [];
	const filterIssues = (/** @type {any} */ ProjectId) => {
		filtered = [];
		for (const issue of issues) {
			if (issue.ProjectId === ProjectId || !ProjectId) filtered.push(issue);
		}
	};
	const projectChanged = (/** @type {any} */ e) => {
		if (e.target && e.target.dataset && e.target.dataset.value) {
			setTimeout(() => {
				timeclock.IssueId = 0;
				filterIssues(e.target.dataset.value);
			}, 100);
		}
	};
	const issueChanged = (/** @type {any} */ e) => {
		if (e.target && e.target.dataset && e.target.dataset.value) {
			const found = issues.find((i) => i.Id == e.target.dataset.value);
			if (found && found.ProjectId) {
				setTimeout(() => {
					timeclock.ProjectId = found.ProjectId;
				}, 100);
			} else {
				console.log(found);
			}
		}
	};
</script>

<LayoutGrid>
	<Cell>
		<Select label="User" style="width:100%" bind:value={timeclock.UserId}>
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
			bind:value={timeclock.ProjectId}
			on:click={projectChanged}
		>
			<Option value={0}>-- Select Project --</Option>
			{#each projects as project}
				<Option value={project.Id}>{project.Name}</Option>
			{/each}
		</Select>
	</Cell>
	<Cell>
		<Select label="Issue" style="width:100%" bind:value={timeclock.IssueId} on:click={issueChanged}>
			<Option value={0}>-- Select Issue --</Option>
			{#each filtered as issue}
				<Option value={issue.Id}>{issue.Title}</Option>
			{/each}
		</Select>
	</Cell>
</LayoutGrid>

<LayoutGrid>
	<Cell span={3}>
		<Textfield
			style="width: 100%;"
			helperLine$style="width: 100%;"
			label="Start Date"
			type="date"
			bind:value={timeclock.Start.Date}
		>
			<HelperText slot="helper">Enter Issue Details</HelperText>
		</Textfield>
	</Cell>
	<Cell span={3}>
		<Textfield
			style="width: 100%;"
			helperLine$style="width: 100%;"
			label="Start Time"
			type="time"
			bind:value={timeclock.Start.Time}
		>
			<HelperText slot="helper">Enter Issue Details</HelperText>
		</Textfield>
	</Cell>
	<Cell span={3}>
		<Textfield
			style="width: 100%;"
			helperLine$style="width: 100%;"
			label="End Date"
			type="date"
			bind:value={timeclock.End.Date}
		>
			<HelperText slot="helper">Enter Issue Details</HelperText>
		</Textfield>
	</Cell>
	<Cell span={3}>
		<Textfield
			style="width: 100%;"
			helperLine$style="width: 100%;"
			label="End Time"
			type="time"
			bind:value={timeclock.End.Time}
		>
			<HelperText slot="helper">Enter Issue Details</HelperText>
		</Textfield>
	</Cell>
</LayoutGrid>
