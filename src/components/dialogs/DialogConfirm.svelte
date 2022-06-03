<script>
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	export /**
	 * @type {boolean | undefined}
	 */
	let open;
	export /**
	 * @type {any}
	 */
	let title;
	export /**
	 * @type {any}
	 */
	let message;
	export let confirmAction = () => {};
	const closeHandler = (e) => {
		if (e.detail.action === 'confirm') confirmAction();
		open = false;
	};
</script>

<Dialog bind:open on:SMUIDialog:closed={closeHandler}>
	<Title>{title}</Title>
	<Content>{message}</Content>
	<Actions>
		<Button>
			<Label>Cancel</Label>
		</Button>
		<Button action="confirm">
			<Label>Confirm</Label>
		</Button>
	</Actions>
</Dialog>
