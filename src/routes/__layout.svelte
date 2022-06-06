<script>
	import { TopBar, NavDrawer, BreadCrumbs, SnackBar, Progress } from '../components/layout';
	import { AutoAdjust } from '@smui/top-app-bar';
	import { Scrim, AppContent } from '@smui/drawer';
	import { DialogLogin } from '../components/dialogs';
	import {
		baseUrl,
		buildHeaders,
		session,
		sessionKey,
		initialStores,
		flash,
		progress
	} from '../lib';

	/**
	 * @type {import("@smui/top-app-bar/src/TopAppBar.svelte").default}
	 */
	let topAppBar;
	let open = {
		panel: false,
		login: false
	};
	let toggleMenu = () => {
		open.panel = !open.panel;
	};
	let signIn = () => {
		open.login = true;
	};
	let signOut = () => {
		session.set(initialStores.session);
		localStorage.removeItem(sessionKey);
		flash.set({
			visible: true,
			message: 'Sign Out Successful'
		});
	};
	let sendLogin = async (/** @type {{ Username: any; Password: any; }} */ payload) => {
		open.login = false;
		const { Username, Password } = payload;
		const url = `${baseUrl}/auth/login`;
		const headers = buildHeaders();
		const results = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({ Username, Password }),
			headers
		});
		if (results.ok) {
			const success = await results.json();
			success.signedIn = true;
			session.set(success);
			flash.set({
				visible: true,
				message: `Signed in as ${success.Name}`
			});
			localStorage.setItem(sessionKey, JSON.stringify(success));
		} else {
			console.log(results);
		}
	};
	const dialogClosed = () => {
		open.login = false;
	};
	const navigate = () => {
		open.panel = false;
		progress.set(true);
	};
</script>

<TopBar {topAppBar} {toggleMenu} {signIn} {signOut} />
<AutoAdjust {topAppBar}>
	<NavDrawer open={open.panel} {navigate} />
	<Scrim fixed={false} style="z-index: 999999" />
	<AppContent style="padding: 4em 1em 1em 1em">
		<BreadCrumbs />
		<Progress />
		<slot />
	</AppContent>
</AutoAdjust>
<DialogLogin open={open.login} {sendLogin} {dialogClosed} />
<SnackBar />
