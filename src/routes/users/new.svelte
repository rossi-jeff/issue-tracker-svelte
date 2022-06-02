<script>
	import { FormUser } from '../../components/forms';
	import { v4 } from 'uuid';
	import { clone, crumbs } from '../../lib';
	import { DialogEmail, DialogPhone, DialogConfirm } from '../../components/dialogs';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	let user = {
		Credentials: {
			Username: '',
			Password: ''
		},
		Name: {
			First: '',
			Middle: '',
			Last: ''
		},
		Emails: [],
		Phones: [],
		Roles: []
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
	let editEmail = (/** @type {any} */ UUID) => {
		// @ts-ignore
		let found = user.Emails.find((e) => e.UUID == UUID);
		if (found) {
			editor.email = clone(found);
			open.confirm = false;
			open.phone = false;
			open.email = true;
		}
	};
	let deleteEmail = (/** @type {any} */ UUID) => {
		// @ts-ignore
		const idx = user.Emails.findIndex((e) => e.UUID === UUID);
		if (idx != -1) {
			/**
			 * @type {{ Address: any; }}
			 */
			const toDelete = user.Emails[idx];
			confirmation.title = 'Delete Email';
			confirmation.message = `Delete Email: ${toDelete.Address}?`;
			confirmation.data = UUID;
			confirmation.entity = 'email';
			open.email = false;
			open.phone = false;
			open.confirm = true;
		}
	};
	let editPhone = (/** @type {any} */ UUID) => {
		console.log('editPhone', UUID);
		// @ts-ignore
		let found = user.Phones.find((p) => p.UUID === UUID);
		if (found) {
			editor.phone = clone(found);
			open.confirm = false;
			open.email = false;
			open.phone = true;
		}
	};
	let deletePhone = (/** @type {any} */ UUID) => {
		// @ts-ignore
		let idx = user.Phones.findIndex((p) => p.UUID === UUID);
		if (idx != -1) {
			/**
			 * @type {{ Number: any; }}
			 */
			const toDelete = user.Phones[idx];
			confirmation.title = 'Delete Phone';
			confirmation.message = `Delete Phone: ${toDelete.Number}?`;
			confirmation.data = UUID;
			confirmation.entity = 'phone';
			open.email = false;
			open.phone = false;
			open.confirm = true;
		}
	};
	let addPhone = (/** @type {any} */ phone) => {
		console.log('addPhone', phone);
		phone.UUID = v4();
		// @ts-ignore
		user.Phones.push(phone);
		user = clone(user);
	};
	let addEmail = (/** @type {any} */ email) => {
		console.log('addEmail', email);
		email.UUID = v4();
		// @ts-ignore
		user.Emails.push(email);
		user = clone(user);
	};
	let updateEmail = (/** @type {any} */ email) => {
		const { UUID } = email;
		// @ts-ignore
		const idx = user.Emails.findIndex((e) => e.UUID === UUID);
		if (idx != -1) {
			// @ts-ignore
			user.Emails[idx] = email;
			user = clone(user);
			open.email = false;
		}
	};
	let updatePhone = (/** @type {any} */ phone) => {
		console.log('updatePhone', phone);
		const { UUID } = phone;
		// @ts-ignore
		let idx = user.Phones.findIndex((p) => p.UUID === UUID);
		if (idx != -1) {
			// @ts-ignore
			user.Phones[idx] = phone;
			user = clone(user);
			open.phone = false;
		}
	};
	let confirmAction = () => {
		let idx;
		if (confirmation.entity === 'email') {
			// @ts-ignore
			idx = user.Emails.findIndex((e) => e.UUID === confirmation.data);
			if (idx != -1) {
				user.Emails.splice(idx, 1);
				user = clone(user);
			}
		} else if (confirmation.entity === 'phone') {
			// @ts-ignore
			idx = user.Phones.findIndex((p) => p.UUID === confirmation.data);
			if (idx != -1) {
				user.Phones.splice(idx, 1);
				user = clone(user);
			}
		}
	};
	let clicked = () => {
		console.log(user);
	};

	let trail = [
		{ text: 'Home', href: '/' },
		{ text: 'Users', href: '/users' },
		{ text: 'New User' }
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
			showPass={true}
		/>
	</Content>
	<Actions fullBleed>
		<Button on:click={clicked}>
			<Label>Save User</Label>
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
