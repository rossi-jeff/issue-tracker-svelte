<script>
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import IconButton, { Icon } from '@smui/icon-button';
  /**
* @type {any[]}
*/
  export let phones = []
  export let editPhone = (/** @type {any} */ UUID) => {}
  export let deletePhone = (/** @type {any} */ UUID) => {}
</script>

<DataTable style="width:100%">
  <Head>
    <Row>
      <Cell></Cell>
      <Cell>Number</Cell>
      <Cell>Type</Cell>
      <Cell>Usage</Cell>
      <Cell>Public</Cell>
      <Cell></Cell>
    </Row>
  </Head>
  <Body>
    {#each phones as phone}
    <Row>
      <Cell style="width:2em">
        <IconButton on:click={() => editPhone(phone.UUID)}>
          <Icon class="material-icons">edit</Icon>
        </IconButton>
      </Cell>
      <Cell>{phone.Number}</Cell>
      <Cell>{phone.Type}</Cell>
      <Cell>{phone.Usage}</Cell>
      <Cell>{phone.Public ? 'Yes' : 'No'}</Cell>
      <Cell style="width:2em">
        <IconButton on:click={() => deletePhone(phone.UUID)}>
          <Icon class="material-icons">close</Icon>
        </IconButton>
      </Cell>
    </Row>
    {/each}
  </Body>
</DataTable>