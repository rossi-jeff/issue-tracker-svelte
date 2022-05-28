<script>
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import { UsageArray } from '../../lib';
  import FormField from '@smui/form-field';
  import Radio from '@smui/radio';
  export /**
* @type {{ Address: string | number | null | undefined; Usage: any; Public: any; UUID?: any; }}
*/
   let email;
  export /**
* @type {boolean | undefined}
*/
   let open;
  export let updateEmail = (/** @type {any} */ payload) => {}

  const closeHandler = (/** @type {{ detail: { action: string; }; }} */ e) => {
    if (e.detail.action === 'update') {
      const { UUID, Address, Usage, Public } = email;
      updateEmail({ UUID, Address, Usage, Public });
    }
  }
</script>

<Dialog bind:open={open} on:SMUIDialog:closed={closeHandler}>
  <Title>Edit Email</Title>
  <Content style="width: 25em; padding: 1em;">
    <div>
      <div>Address</div>
      <Textfield bind:value={email.Address} style="width:100%">
        <HelperText slot="helper">helper text</HelperText>
      </Textfield>
    </div>
    <div>
      <div>Usage</div>
      {#each UsageArray as usage}
        <FormField>
          <Radio value={usage} bind:group={email.Usage} />
          <span slot="label">{usage}</span>
        </FormField>
      {/each}
    </div>
    <div>
      <div>Public</div>
      {#each [true, false] as pub}
        <FormField>
          <Radio value={pub} bind:group={email.Public} />
          <span slot="label">{pub ? 'Yes' : 'No'}</span>
        </FormField>
      {/each}
    </div>
  </Content>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button action="update">
      <Label>Update Email</Label>
    </Button>
  </Actions>
</Dialog>