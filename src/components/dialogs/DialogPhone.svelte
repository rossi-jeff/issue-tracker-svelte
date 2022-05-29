<script>
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text';
  import { UsageArray, PhoneTypeArray } from '../../lib';
  import FormField from '@smui/form-field';
  import Radio from '@smui/radio';
  export /**
* @type {boolean | undefined}
*/
   let open;
  export /**
* @type {{ Number: any; Type?: any; Usage: any; Public: any; UUID?: any; }}
*/
   let phone;
   export let updatePhone = ( /** @type {{ UUID: any; Number: any; Usage: any; Public: any; }} */ payload) => {}
   const closeHandler = (/** @type {{ detail: { action: string; }; }} */ e) => {
      if (e.detail.action === 'update') {
        const { UUID, Number, Usage, Public } = phone;
        updatePhone({ UUID, Number, Usage, Public });
      }
      open = false;
    }
</script>

<Dialog bind:open={open} on:SMUIDialog:closed={closeHandler}>
  <Title>Edit Phone</Title>
  <Content style="width: 25em; padding: 1em;">
    <div>
      <div>Number</div>
      <Textfield bind:value={phone.Number} style="width:100%">
        <HelperText slot="helper">helper text</HelperText>
      </Textfield>
    </div>
    <div>
      <div>Type</div>
      {#each PhoneTypeArray as type}
        <FormField>
          <Radio value={type} bind:group={phone.Type} />
          <span slot="label">{type}</span>
        </FormField>
      {/each}
    </div>
    <div>
      <div>Usage</div>
      {#each UsageArray as usage}
        <FormField>
          <Radio value={usage} bind:group={phone.Usage} />
          <span slot="label">{usage}</span>
        </FormField>
      {/each}
    </div>
    <div>
      <div>Public</div>
      {#each [true, false] as pub}
        <FormField>
          <Radio value={pub} bind:group={phone.Public} />
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
      <Label>Update Phone</Label>
    </Button>
  </Actions>
</Dialog>