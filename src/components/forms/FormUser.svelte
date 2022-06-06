<script>
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Checkbox from '@smui/checkbox';
	import FormField from '@smui/form-field';
	import { RoleArray, UsageArray, PhoneTypeArray } from '../../lib';
	import { TableEmail, TablePhone } from '../tables';
	import Radio from '@smui/radio';
	import Button, { Label } from '@smui/button';
	export /**
	 * @type {any}
	 */
	let showPass;
	export /**
	 * @type {any}
	 */
	let user;
	export let editEmail = (/** @type {any} */ UUID) => {};
	export let deleteEmail = (/** @type {any} */ UUID) => {};
	export let editPhone = (/** @type {any} */ UUID) => {};
	export let deletePhone = (/** @type {any} */ UUID) => {};
	export let addPhone = (/** @type {any} */ phone) => {};
	export let addEmail = (/** @type {any} */ email) => {};
	let email = {
		Address: '',
		Usage: 'Personal',
		Public: false
	};
	let phone = {
		Number: '',
		Type: 'Cellular',
		Usage: 'Personal',
		Public: false
	};
	export /**
	 * @type {any}
	 */
	let enabled;
	const newPhone = () => {
		const { Number, Type, Usage, Public } = phone;
		addPhone({ Number, Type, Usage, Public });
		phone.Number = '';
	};
	const newEmail = () => {
		const { Address, Usage, Public } = email;
		addEmail({ Address, Usage, Public });
		email.Address = '';
	};
</script>

<Accordion>
	<Panel>
		<Header>Credentials</Header>
		<Content>
			<LayoutGrid>
				<Cell>
					<Textfield
						style="width: 100%;"
						helperLine$style="width: 100%;"
						bind:value={user.Credentials.Username}
						label="Username"
						disabled={!enabled}
					>
						<HelperText slot="helper">helper text</HelperText>
					</Textfield>
				</Cell>
				{#if showPass}
					<Cell>
						<Textfield
							style="width: 100%;"
							helperLine$style="width: 100%;"
							bind:value={user.Credentials.Password}
							label="Password"
							type="password"
							disabled={!enabled}
						>
							<HelperText slot="helper">helper text</HelperText>
						</Textfield>
					</Cell>
				{/if}
			</LayoutGrid>
		</Content>
	</Panel>
	<Panel>
		<Header>Name</Header>
		<Content>
			<LayoutGrid>
				<Cell>
					<Textfield
						style="width: 100%;"
						helperLine$style="width: 100%;"
						bind:value={user.Name.First}
						label="First"
						disabled={!enabled}
					>
						<HelperText slot="helper">helper text</HelperText>
					</Textfield>
				</Cell>
				<Cell>
					<Textfield
						style="width: 100%;"
						helperLine$style="width: 100%;"
						bind:value={user.Name.Middle}
						label="Middle"
						disabled={!enabled}
					>
						<HelperText slot="helper">helper text</HelperText>
					</Textfield>
				</Cell>
				<Cell>
					<Textfield
						style="width: 100%;"
						helperLine$style="width: 100%;"
						bind:value={user.Name.Last}
						label="Last"
						disabled={!enabled}
					>
						<HelperText slot="helper">helper text</HelperText>
					</Textfield>
				</Cell>
			</LayoutGrid>
		</Content>
	</Panel>
	<Panel>
		<Header>Email</Header>
		<Content>
			<LayoutGrid>
				<Cell span={3}>
					<div>Address</div>
					<Textfield bind:value={email.Address} style="width:100%">
						<HelperText slot="helper">helper text</HelperText>
					</Textfield>
				</Cell>
				<Cell span={3}>
					<div>Usage</div>
					{#each UsageArray as usage}
						<FormField>
							<Radio value={usage} bind:group={email.Usage} disabled={!enabled} />
							<span slot="label">{usage}</span>
						</FormField>
					{/each}
				</Cell>
				<Cell span={3}>
					<div>Public</div>
					{#each [true, false] as pub}
						<FormField>
							<Radio value={pub} bind:group={email.Public} disabled={!enabled} />
							<span slot="label">{pub ? 'Yes' : 'No'}</span>
						</FormField>
					{/each}
				</Cell>
				<Cell span={3}>
					<Button on:click={newEmail} disabled={!enabled}>
						<Label style="margin-right: 0.5em">Add Email</Label>
						<i class="material-icons" aria-hidden="true">save</i>
					</Button>
				</Cell>
			</LayoutGrid>
			{#if user.Emails.length}
				<TableEmail emails={user.Emails} {editEmail} {deleteEmail} {enabled} />
			{/if}
		</Content>
	</Panel>
	<Panel>
		<Header>Phone</Header>
		<Content>
			<LayoutGrid>
				<Cell span={3}>
					<div>Number</div>
					<Textfield bind:value={phone.Number} style="width:100%" disabled={!enabled}>
						<HelperText slot="helper">helper text</HelperText>
					</Textfield>
				</Cell>
				<Cell span={2}>
					<div>Type</div>
					{#each PhoneTypeArray as type}
						<FormField>
							<Radio value={type} bind:group={phone.Type} disabled={!enabled} />
							<span slot="label">{type}</span>
						</FormField>
					{/each}
				</Cell>
				<Cell span={2}>
					<div>Usage</div>
					{#each UsageArray as usage}
						<FormField>
							<Radio value={usage} bind:group={phone.Usage} disabled={!enabled} />
							<span slot="label">{usage}</span>
						</FormField>
					{/each}
				</Cell>
				<Cell span={2}>
					<div>Public</div>
					{#each [true, false] as pub}
						<FormField>
							<Radio value={pub} bind:group={phone.Public} disabled={!enabled} />
							<span slot="label">{pub ? 'Yes' : 'No'}</span>
						</FormField>
					{/each}
				</Cell>
				<Cell span={2}>
					<Button on:click={newPhone} disabled={!enabled}>
						<Label style="margin-right: 0.5em">Add Phone</Label>
						<i class="material-icons" aria-hidden="true">save</i>
					</Button>
				</Cell>
			</LayoutGrid>
			{#if user.Phones.length}
				<TablePhone phones={user.Phones} {editPhone} {deletePhone} {enabled} />
			{/if}
		</Content>
	</Panel>
	<Panel>
		<Header>Role</Header>
		<Content>
			<LayoutGrid>
				{#each RoleArray as role}
					<Cell span={2}>
						<FormField>
							<Checkbox value={role} bind:group={user.Roles} disabled={!enabled} />
							<span slot="label" style="cursor: pointer;">{role}</span>
						</FormField>
					</Cell>
				{/each}
			</LayoutGrid>
		</Content>
	</Panel>
</Accordion>
