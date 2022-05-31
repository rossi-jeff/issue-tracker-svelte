<script>
	import { TopBar, NavDrawer } from '../components/layout';
	import { AutoAdjust } from '@smui/top-app-bar';
	import { Scrim, AppContent } from '@smui/drawer';

	/**
	 * @type {import("@smui/top-app-bar/src/TopAppBar.svelte").default}
	 */
	let topAppBar;
	let open = false;
	let toggleMenu = () => {
		console.log('toggleMenu');
		open = !open;
	};
	let signIn = () => {
		console.log('signIn');
	};
	let signOut = () => {
		console.log('signOut');
	};
</script>

<TopBar {topAppBar} {toggleMenu} {signIn} {signOut} />
<AutoAdjust {topAppBar}>
	<NavDrawer {open} {toggleMenu} />
	<Scrim fixed={false} />
	<AppContent style="padding: 4em 1em 1em 1em">
		<slot />
	</AppContent>
</AutoAdjust>
