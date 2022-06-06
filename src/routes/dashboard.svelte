<script>
	import { crumbs, progress, baseUrl, clone } from '../lib';
	import { onMount } from 'svelte';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { CardDashboard } from '../components/cards';

	let trail = [{ text: 'Home', href: '/' }, { text: 'Dashboard' }];
	crumbs.set(trail);

	/**
	 * @type {any[]}
	 */
	let issues = [];
	/**
* @type {{ new: any[]; accepted: any[]; assigned: any[]; fixed: any[]; other: any[]; }}
*/
	let sorted = {
		new: [],
		accepted: [],
		assigned: [],
		fixed: [],
		other: []
	}

	onMount(() => {
		fetch(`${baseUrl}/issue`)
			.then((results) => results.json())
			.then((data) => {
				issues = data;
				for (const issue of issues) {
					switch (issue.Status) {
						case 'New':
							sorted.new.push(issue);
							break;
						case 'Accepted':
							sorted.accepted.push(issue);
							break;
						case 'Assigned':
							sorted.assigned.push(issue);
							break;
						case 'Fixed':
							sorted.fixed.push(issue);
							break;
						default:
							sorted.other.push(issue);
							break;
					}
				}
				sorted = clone(sorted)
				progress.set(false);
			});
	});
</script>

<LayoutGrid>
	<Cell span={3}>
		<h4>New</h4>
		<div class="auto-300">
			{#each sorted.new as issue (issue.Id)}
				<CardDashboard {issue} />
			{/each}
		</div>
	</Cell>
	<Cell span={3}>
		<h4>Assigned</h4>
		<div class="auto-300">
			{#each sorted.assigned as issue (issue.Id)}
				<CardDashboard {issue} />
			{/each}
		</div>
	</Cell>
	<Cell span={3}>
		<h4>Accepted</h4>
		<div class="auto-300">
			{#each sorted.accepted as issue (issue.Id)}
				<CardDashboard {issue} />
			{/each}
		</div>
	</Cell>
	<Cell span={3}>
		<h4>Fixed</h4>
		<div class="auto-300">
			{#each sorted.fixed as issue (issue.Id)}
				<CardDashboard {issue} />
			{/each}
		</div>
	</Cell>
</LayoutGrid>

<div>
	<h4>Other</h4>
	<div class="auto-300">
		{#each sorted.other as issue (issue.Id)}
			<CardDashboard {issue} />
		{/each}
	</div>
</div>
