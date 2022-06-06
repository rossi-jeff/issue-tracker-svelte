<script>
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	export /**
	 * @type {boolean | undefined}
	 */
	let open;

	let closeHandler = (/** @type {{ detail: { action: string; }; }} */ e) => {
		if (e.detail.action === 'change') changePassWord(payload);
		open = false;
	};

	let payload = {
		OldPassword: '',
		Password: '',
		Confirm: ''
	};

	export let changePassWord = (
		/** @type {{ OldPassword: string; Password: string; Confirm: string; }} */ params
	) => {};
</script>

<Dialog bind:open on:SMUIDialog:closed={closeHandler}>
	<Title>Change Password</Title>
	<Content>
		<div>
			<div>Old Password</div>
			<Textfield bind:value={payload.OldPassword} type="password" style="width:100%">
				<HelperText slot="helper">helper text</HelperText>
			</Textfield>
		</div>
		<div>
			<div>New Password</div>
			<Textfield bind:value={payload.Password} type="password" style="width:100%">
				<HelperText slot="helper">helper text</HelperText>
			</Textfield>
		</div>
		<div>
			<div>Confirmation</div>
			<Textfield bind:value={payload.Confirm} type="password" style="width:100%">
				<HelperText slot="helper">helper text</HelperText>
			</Textfield>
		</div>
	</Content>
	<Actions>
		<Button>
			<Label>Cancel</Label>
		</Button>
		<Button action="change">
			<Label>Change PassWord</Label>
		</Button>
	</Actions>
</Dialog>
