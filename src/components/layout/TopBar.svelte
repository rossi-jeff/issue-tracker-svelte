<script>
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	export let topAppBar;
	export let toggleMenu = () => {};
	export let signIn = () => {};
	export let signOut = () => {};
</script>

<TopAppBar bind:this={topAppBar} variant="fixed" style="z-index: 99999">
	<Row>
		<Section>
			<IconButton class="material-icons" on:click={toggleMenu}>menu</IconButton>
			<Title>Issue Tracker</Title>
		</Section>
		<Section align="end" toolbar>
			<IconButton class="material-icons" aria-label="Sign In" on:click={signIn}>login</IconButton>
			<IconButton class="material-icons" aria-label="Sign Out" on:click={signOut}>logout</IconButton
			>
		</Section>
	</Row>
</TopAppBar>
