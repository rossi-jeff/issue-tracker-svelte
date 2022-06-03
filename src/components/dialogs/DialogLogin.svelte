<script>
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	export /**
	 * @type {boolean | undefined}
	 */
	let open;
	const closeHandler = (/** @type {{ detail: { action: string; }; }} */ e) => {
		if (e.detail.action === 'login') {
			sendLogin(payload);
		}
		dialogClosed();
	};
	const payload = {
		Username: '',
		Password: ''
	};
	export let sendLogin = (/** @type {any} */ payload) => {};
	export let dialogClosed = () => {};
</script>

<Dialog bind:open on:SMUIDialog:closed={closeHandler} style="z-index: 999999">
	<Title>Sign In</Title>
	<Content style="width: 25em; padding: 1em;">
		<div>
			<div>Username</div>
			<Textfield bind:value={payload.Username} style="width:100%">
				<HelperText slot="helper">helper text</HelperText>
			</Textfield>
		</div>
		<div>
			<div>Password</div>
			<Textfield bind:value={payload.Password} style="width:100%" type="password">
				<HelperText slot="helper">helper text</HelperText>
			</Textfield>
		</div>
	</Content>
	<Actions>
		<Button>
			<Label>Cancel</Label>
		</Button>
		<Button action="login">
			<Label>Sign In</Label>
		</Button>
	</Actions>
</Dialog>
