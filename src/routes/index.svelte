<script>
	import { session, sessionKey, crumbs, progress } from '../lib';
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

	onMount(() => {
		if (!currentUser.signedIn) {
			const stored = localStorage.getItem(sessionKey);
			if (stored) {
				session.set(JSON.parse(stored));
			}
		}
		progress.set(false);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
