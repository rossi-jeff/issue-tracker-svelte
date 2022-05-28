<script>
	import { FormUser } from '../../components/forms';
	import { v4 } from 'uuid';
	import { clone } from '../../lib';
	import { DialogEmail } from '../../components/dialogs';
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
	let editEmail = (/** @type {any} */ UUID) => {
		// @ts-ignore
		let found = user.Emails.find((e) => e.UUID == UUID);
		if (found) {
			editor.email = clone(found);
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
			if (toDelete && confirm(`Delete email: ${toDelete.Address}?`)) {
				user.Emails.splice(idx,1);
				user = clone(user);
			}
		}
	};
	let editPhone = (/** @type {any} */ UUID) => {
		console.log('editPhone', UUID);
	};
	let deletePhone = (/** @type {any} */ UUID) => {
		console.log('deletePhone', UUID);
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
		}
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
	let open = {
		email: false,
		phone: false
	};
</script>

<FormUser {user} {editEmail} {editPhone} {deleteEmail} {deletePhone} {addPhone} {addEmail} />
<DialogEmail email={editor.email} open={open.email} {updateEmail} />
