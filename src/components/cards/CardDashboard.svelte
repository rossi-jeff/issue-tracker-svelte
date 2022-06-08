<script>
	import Card, { Content as CardContent } from '@smui/card';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import { FormatName } from '../../lib';
	import { onMount } from 'svelte';
	export /**
	 * @type {{ UUID: string | null | undefined; SequenceNumber: any; Title: any; Details: any; Project: { Name: any; }; Priority: any; Status: any; Type: any; Complexity: any; Created: any; Author: { Name: { First: any; Middle: any; Last: any; }; }; AssignedTo: { Name: { First: any; Middle: any; Last: any; }; }; }}
	 */
	let issue;
	export /**
	 * @type {boolean}
	 */
	let draggable;
	let visible = false;

	export let enableDrag = (/** @type {any} */ UUID) => {};

	const toggleVisible = () => {
		visible = !visible;
	};

	onMount(() => {
		if (draggable) enableDrag(issue.UUID);
	});
</script>

<Card
	variant="outlined"
	style="margin-bottom: 0.25em"
	{draggable}
	class="dashboard-card"
	id={issue.UUID}
>
	<CardContent>
		<div on:click={toggleVisible} class="dashboard-header">
			{issue.SequenceNumber}
		</div>
		{#if visible}
			<div style="margin-bottom: 0.5em">{issue.Title}</div>
			<Accordion>
				<Panel>
					<Header>Description</Header>
					<Content>
						{issue.Details}
					</Content>
				</Panel>
				<Panel>
					<Header>Details</Header>
					<Content>
						{#if issue.Project}
							<div>
								<strong>Project</strong>
								{issue.Project.Name}
							</div>
						{/if}
						<div>
							<strong>Priority</strong>
							{issue.Priority}
						</div>
						<div>
							<strong>Status</strong>
							{issue.Status}
						</div>
						<div>
							<strong>Type</strong>
							{issue.Type}
						</div>
						<div>
							<strong>Complexity</strong>
							{issue.Complexity}
						</div>
						<div>
							<strong>Created</strong>
							{issue.Created}
						</div>
						{#if issue.Author}
							<div>
								<strong>Author</strong>
								{FormatName(issue.Author.Name)}
							</div>
						{/if}
						{#if issue.AssignedTo}
							<div>
								<strong>Assigned</strong>
								{FormatName(issue.AssignedTo.Name)}
							</div>
						{/if}
					</Content>
				</Panel>
			</Accordion>
		{/if}
	</CardContent>
</Card>
