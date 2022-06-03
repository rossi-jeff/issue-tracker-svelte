<script>
	import { FormUser } from '../../components/forms';
	import { DialogEmail, DialogPhone, DialogConfirm } from '../../components/dialogs';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { FormatName, crumbs, baseUrl, buildHeaders, session, flash, clone } from '../../lib';
	export /**
	 * @type {{ Emails: any; Phones: any; UUID: any; Name: { First: any; Middle: any; Last: any; }; }}
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
	const editEmail = (/** @type {any} */ UUID) => {
		let found = user.Emails.find((/** @type {{ UUID: any; }} */ e) => e.UUID == UUID);
		if (found) {
			editor.email = clone(found);
			open.confirm = false;
			open.phone = false;
			open.email = true;
		}
	};
	let deleteEmail = (/** @type {any} */ UUID) => {
		const idx = user.Emails.findIndex((/** @type {{ UUID: any; }} */ e) => e.UUID === UUID);
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
	const editPhone = (/** @type {any} */ UUID) => {
		let found = user.Phones.find((/** @type {{ UUID: any; }} */ p) => p.UUID === UUID);
		if (found) {
			editor.phone = clone(found);
			open.confirm = false;
			open.email = false;
			open.phone = true;
		}
	};
	let deletePhone = (/** @type {any} */ UUID) => {
		let idx = user.Phones.findIndex((/** @type {{ UUID: any; }} */ p) => p.UUID === UUID);
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
	const addPhone = (/** @type {any} */ phone) => {
		// unable to use async/await, not sure why
		const headers = buildHeaders(currentUser);
		const url = `${baseUrl}/user/${user.UUID}/phone`;
		try {
			fetch(url, { method: 'POST', body: JSON.stringify(phone), headers })
				.then((results) => results.json())
				.then((saved) => {
					flash.set({ visible: true, message: `Saved Phone: ${saved.Number}` });
					reloadUser();
				});
		} catch (e) {
			console.log(e);
		}
	};
	const addEmail = (/** @type {any} */ email) => {
		const headers = buildHeaders(currentUser);
		const url = `${baseUrl}/user/${user.UUID}/email`;
		try {
			fetch(url, { method: 'POST', body: JSON.stringify(email), headers })
				.then((results) => results.json())
				.then((saved) => {
					flash.set({ visible: true, message: `Saved Email: ${saved.Address}` });
					reloadUser();
				});
		} catch (error) {
			console.log(error);
		}
	};
	let confirmAction = () => {
		let idx, url;
		const headers = buildHeaders(currentUser);
		try {
			if (confirmation.entity === 'email') {
				idx = user.Emails.findIndex(
					(/** @type {{ UUID: any; }} */ e) => e.UUID === confirmation.data
				);
				if (idx != -1) {
					url = `${baseUrl}/email/${confirmation.data}`;
					fetch(url, { method: 'DELETE', headers }).then(() => {
						reloadUser();
					});
				}
			} else if (confirmation.entity === 'phone') {
				idx = user.Phones.findIndex(
					(/** @type {{ UUID: any; }} */ p) => p.UUID === confirmation.data
				);
				if (idx != -1) {
					url = `${baseUrl}/phone/${confirmation.data}`;
					fetch(url, { method: 'DELETE', headers }).then(() => {
						reloadUser();
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	const updatePhone = (/** @type {any} */ phone) => {
		const { UUID } = phone;
		const url = `${baseUrl}/phone/${UUID}`;
		const headers = buildHeaders(currentUser);
		try {
			fetch(url, { method: 'PATCH', body: JSON.stringify(phone), headers })
				.then((results) => results.json())
				.then((saved) => {
					flash.set({ visible: true, message: `Updated Phone: ${saved.Number}` });
					reloadUser();
				});
		} catch (error) {
			console.log(error);
		}
	};
	const updateEmail = (/** @type {any} */ email) => {
		const { UUID } = email;
		const url = `${baseUrl}/email/${UUID}`;
		const headers = buildHeaders(currentUser);
		try {
			fetch(url, { method: 'PATCH', body: JSON.stringify(email), headers })
				.then((results) => results.json())
				.then((saved) => {
					flash.set({ visible: true, message: `Updated Email: ${saved.Address}` });
					reloadUser();
				});
		} catch (error) {
			console.log(error);
		}
	};
	const updateUser = async () => {
		// @ts-ignore
		delete user.Emails;
		// @ts-ignore
		delete user.Phones;
		const headers = buildHeaders(currentUser);
		let url = `${baseUrl}/user/${user.UUID}`;
		const response = await fetch(url, { method: 'PATCH', body: JSON.stringify(user), headers });
		if (response.ok) {
			const updated = await response.json();
			flash.set({
				visible: true,
				message: `Updated: ${FormatName(updated.Name)}`
			});
			window.location.href = '/users';
		}
	};

	const reloadUser = () => {
		const url = `${baseUrl}/user/${user.UUID}`;
		try {
			fetch(url)
				.then((results) => results.json())
				.then((saved) => {
					user = saved;
				});
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * @type {{ Token?: any; } | undefined}
	 */
	let currentUser;
	session.subscribe((value) => {
		currentUser = value;
	});

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
		<Button on:click={updateUser}>
			<Label>Update User</Label>
			<i class="material-icons" aria-hidden="true">save</i>
		</Button>
	</Actions>
</Card>

<div class="scroll-space" />

<DialogConfirm
	title={confirmation.title}
	message={confirmation.message}
	open={open.confirm}
	{confirmAction}
/>
<DialogPhone phone={editor.phone} open={open.phone} {updatePhone} />
<DialogEmail email={editor.email} open={open.email} {updateEmail} />
