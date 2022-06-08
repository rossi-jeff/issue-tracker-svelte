<script>
	import { session, sessionKey, crumbs, progress, baseUrl } from '../lib';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import { onMount } from 'svelte';
	/**
	 * @type {{ signedIn: any; Name?: string; UserName?: string; Token?: string; UUID?: string; SessionId?: string; }}
	 */
	let currentUser;
	session.subscribe((value) => {
		currentUser = value;
	});

	let trail = [{ text: 'Home' }];
	crumbs.set(trail);

	/**
	 * @type {any[]}
	 */
	let resources = [];
	/**
	 * @type {any}
	 */
	let active;

	const showResource = (/** @type {any} */ UUID) => {
		console.log('showResource', UUID);
		const details = document.getElementsByClassName('tab-detail');
		for (let i = 0; i < details.length; i++) {
			details[i].classList.remove('selected-tab-detail');
			details[i].classList.add('tab-detail-hidden');
		}
		const selected = document.getElementById(UUID);
		if (selected) {
			selected.classList.remove('tab-detail-hidden');
			selected.classList.add('selected-tab-detail');
		}
	};

	onMount(() => {
		progress.set(true);
		if (!currentUser.signedIn) {
			const stored = localStorage.getItem(sessionKey);
			if (stored) {
				session.set(JSON.parse(stored));
			}
		}
		const url = `${baseUrl}/resource`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				resources = data;
				progress.set(false);
				if (resources.length)
					setTimeout(() => {
						active = resources[0];
						showResource(resources[0].UUID);
					}, 100);
			});
	});
</script>

<h3>Welcome to Issue Tracker</h3>
<p>
	This site is a functional example of an issue tracking application. All of the existing data has
	been generated randomly. It is not intended to be used as a replacement for current leaders in the
	field such as Jira. The goal of the site is simply a proof of concept for an issue tracking
	application.
</p>
<p>
	Construction of the site used the component based framework Svelte Kit. The benefit of using a
	component based framework is that it becomes easier to follow the DRY ( don't repeat yourself )
	principle. In addition, effort was made not to reinvent the wheel. In so doing, the open source
	packages listed below were utilized.
</p>
<p>
	This site is one of four front end applications using the frameworks Vue, React, Angular, and
	Svelte Kit respectively
</p>

<TabBar tabs={resources} let:tab key={(tab) => tab.Id} bind:active>
	<Tab {tab} on:click={() => showResource(tab.UUID)}>
		<Label>{tab.Name}</Label>
	</Tab>
</TabBar>

{#each resources as resource}
	<div id={resource.UUID} class="tab-detail tab-detail-hidden">{resource.Details}</div>
{/each}
