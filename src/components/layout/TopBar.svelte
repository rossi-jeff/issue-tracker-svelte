<script>
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import { session, sessionKey } from '../../lib';
	import { onMount } from 'svelte';
	export let topAppBar;
	export let toggleMenu = () => {};
	export let signIn = () => {};
	export let signOut = () => {};

	/**
	 * @type {{ signedIn: any; Name?: string; UserName?: string; Token?: string; UUID?: string; SessionId?: string; }}
	 */
	let currentUser;
	session.subscribe((value) => {
		currentUser = value;
	});

	onMount(() => {
		if (!currentUser.signedIn) {
			const stored = localStorage.getItem(sessionKey);
			if (stored) {
				session.set(JSON.parse(stored));
			}
		}
	});
</script>

<TopAppBar bind:this={topAppBar} variant="fixed" style="z-index: 99999">
	<Row>
		<Section>
			<IconButton class="material-icons" on:click={toggleMenu}>menu</IconButton>
			<Title>Issue Tracker</Title>
		</Section>
		<Section align="end" toolbar>
			{#if currentUser.signedIn}
				<IconButton class="material-icons" aria-label="Sign Out" title="Sign Out" on:click={signOut}
					>logout</IconButton
				>
			{:else}
				<IconButton class="material-icons" aria-label="Sign In" title="Sign In" on:click={signIn}
					>login</IconButton
				>
			{/if}
		</Section>
	</Row>
</TopAppBar>
