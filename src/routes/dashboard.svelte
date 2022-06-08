<script>
	import { crumbs, progress, baseUrl, clone, session, flash, buildHeaders } from '../lib';
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
	};

	const setupDroppable = () => {
		const droppables = document.querySelectorAll('.drop-target');
		droppables.forEach((d) => {
			d.addEventListener('dragenter', dragEnter);
			d.addEventListener('dragover', dragOver);
			d.addEventListener('dragleave', dragExit);
			d.addEventListener('drop', drop);
		});
	};

	const dragStart = (/** @type {any} */ e) => {
		e.dataTransfer.setData('text/plain', e.target.id);
	};

	const dragging = (/** @type {any} */ e) => {
		e.dataTransfer.setData('text/plain', e.target.id);
	};

	const enableDrag = (/** @type {any} */ UUID) => {
		const draggable = document.getElementById(UUID);
		if (draggable) {
			draggable.addEventListener('dragstart', dragStart);
			draggable.addEventListener('drag', dragging);
			draggable.classList.add('draggable');
		}
	};

	const dragOver = (/** @type {any} */ e) => {
		e.preventDefault();
		e.target.classList.add('drag-over');
	};

	const dragEnter = (/** @type {any} */ e) => {
		e.preventDefault();
		e.target.classList.add('drag-over');
	};

	const dragExit = (/** @type {any} */ e) => {
		e.target.classList.remove('drag-over');
	};

	const drop = (/** @type {any} */ e) => {
		console.log('drop', e);
		e.target.classList.remove('drag-over');

		const id = e.dataTransfer.getData('text/plain');
		let parent,
			target = e.target;
		while (target.classList && !target.classList.contains('drop-target')) {
			parent = target.parentNode;
			if (parent) target = parent;
		}
		if (id && target) {
			const draggable = document.getElementById(id);
			target.appendChild(draggable);
			let Status;
			switch (target.id) {
				case 'drop-new':
					Status = 'New';
					break;
				case 'drop-assigned':
					Status = 'Assigned';
					break;
				case 'drop-accepted':
					Status = 'Accepted';
					break;
				case 'drop-fixed':
					Status = 'Fixed';
					break;
				case 'drop-other':
					Status = '';
					break;
				default:
					break;
			}
			if (Status != undefined) {
				const headers = buildHeaders(currentUser);
				const url = `${baseUrl}/issue/${id}`;
				fetch(url, {
					method: 'PATCH',
					body: JSON.stringify({ Status }),
					headers
				})
					.then((response) => response.json())
					.then((saved) => {
						flash.set({ visible: true, message: `Updated Issue: ${saved.SequenceNumber}` });
					})
					.catch((e) => console.log(e));
			}
		}
		console.log(`Dropped: ${id} in ${target.id}`);
	};

	/**
	 * @type {{ signedIn: any; Name?: string; UserName?: string; Token?: string; UUID?: string; SessionId?: string; }}
	 */
	let currentUser;
	session.subscribe((value) => {
		currentUser = value;
	});

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
				sorted = clone(sorted);
				progress.set(false);
				if (currentUser.signedIn) {
					setupDroppable();
				}
			});
	});
</script>

<LayoutGrid>
	<Cell span={3}>
		<h4>New</h4>
		<div class="auto-300 drop-target" id="drop-new">
			{#each sorted.new as issue (issue.Id)}
				<CardDashboard {issue} draggable={currentUser.signedIn} {enableDrag} />
			{/each}
		</div>
	</Cell>
	<Cell span={3}>
		<h4>Assigned</h4>
		<div class="auto-300 drop-target" id="drop-assigned">
			{#each sorted.assigned as issue (issue.Id)}
				<CardDashboard {issue} draggable={currentUser.signedIn} {enableDrag} />
			{/each}
		</div>
	</Cell>
	<Cell span={3}>
		<h4>Accepted</h4>
		<div class="auto-300 drop-target" id="drop-accepted">
			{#each sorted.accepted as issue (issue.Id)}
				<CardDashboard {issue} draggable={currentUser.signedIn} {enableDrag} />
			{/each}
		</div>
	</Cell>
	<Cell span={3}>
		<h4>Fixed</h4>
		<div class="auto-300 drop-target" id="drop-fixed">
			{#each sorted.fixed as issue (issue.Id)}
				<CardDashboard {issue} draggable={currentUser.signedIn} {enableDrag} />
			{/each}
		</div>
	</Cell>
</LayoutGrid>

<div style="padding: 1em">
	<h4>Other</h4>
	<div class="auto-300 drop-target" id="drop-other">
		{#each sorted.other as issue (issue.Id)}
			<CardDashboard
				{issue}
				draggable={false}
				enableDrag={() => {
					return false;
				}}
			/>
		{/each}
	</div>
</div>
