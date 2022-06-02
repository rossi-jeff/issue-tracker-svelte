<script>
	import { FormUser } from '../../components/forms';
	import { DialogEmail, DialogPhone, DialogConfirm } from '../../components/dialogs';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { FormatName, crumbs } from '../../lib';
	export /**
	 * @type {any}
	 */
	let user;
	let confirmation = {
		title: '',
		message: '',
		entity: '',
		data: ''
	};
	let open = {
		email: false,
		phone: false,
		confirm: false
	};
	let editor = {
		email: {
			Address: '',
			Usage: 'Personal',
			Public: false
		},
		phone: {
			Number: '',
			Type: 'Cellular',
			Usage: 'Personal',
			Public: false
		}
	};
	let editEmail = (/** @type {any} */ UUID) => {};
	let deleteEmail = (/** @type {any} */ UUID) => {};
	let editPhone = (/** @type {any} */ UUID) => {};
	let deletePhone = (/** @type {any} */ UUID) => {};
	let addPhone = (/** @type {any} */ phone) => {};
	let addEmail = (/** @type {any} */ email) => {};
	let confirmAction = () => {};
	let updatePhone = (/** @type {any} */ phone) => {};
	let updateEmail = (/** @type {any} */ email) => {};
	let clicked = () => {
		console.log(user);
	};

	let trail = [
		{ text: 'Home', href: '/' },
		{ text: 'Users', href: '/users' },
		{ text: FormatName(user.Name) }
	];
	crumbs.set(trail);
</script>

<Card>
	<Content>
		<FormUser
			{user}
			{editEmail}
			{editPhone}
			{deleteEmail}
			{deletePhone}
			{addPhone}
			{addEmail}
			showPass={false}
		/>
	</Content>
	<Actions fullBleed>
		<Button on:click={clicked}>
			<Label>Update User</Label>
			<i class="material-icons" aria-hidden="true">save</i>
		</Button>
	</Actions>
</Card>

<DialogConfirm
	title={confirmation.title}
	message={confirmation.message}
	open={open.confirm}
	{confirmAction}
/>
<DialogPhone phone={editor.phone} open={open.phone} {updatePhone} />
<DialogEmail email={editor.email} open={open.email} {updateEmail} />
