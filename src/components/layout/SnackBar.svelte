<script>
	import { flash } from '../../lib';
	import Snackbar, { Actions, Label } from '@smui/snackbar';
	import IconButton from '@smui/icon-button';
	/**
	 * @type {{ visible: any; message: any; }}
	 */
	let snack;
	/**
	 * @type {import("@smui/snackbar").SnackbarComponentDev}
	 */
	let snackbar;
  flash.subscribe((value) => {
		snack = value;
		if (snackbar && snack.visible) {
			snackbar.open();
		}
	});
</script>

<Snackbar bind:this={snackbar} labelText={snack.message}>
	<Label />
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>
