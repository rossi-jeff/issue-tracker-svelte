<script>
	import IconButton, { Icon } from '@smui/icon-button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Select, { Option } from '@smui/select';
	import { PriorityArray, StatusArray, IssueTypeArray, ComplexityArray, baseUrl } from '../../lib';
	import { onMount } from 'svelte';
  import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	let filter = {
		Priority: '',
		Status: '',
		Type: '',
		Complexity: '',
		AuthorId: 0,
		AssignedToId: 0
	};
	/**
	 * @type {any[]}
	 */
	let users = [];
	onMount(async () => {
		const url = `${baseUrl}/user`;
		const results = await fetch(url);
		if (results.ok) {
			users = await results.json();
		}
	});
</script>

<IconButton href="/issues/new" title="Add a New Issue">
  <Icon class="material-icons">add_circle_outline</Icon>
</IconButton>
<Accordion>
  <Panel>
    <Header>Filter Issues</Header>
    <Content>
      <LayoutGrid>
        <Cell>
          <Select label="Priority" style="width:100%" bind:value={filter.Priority}>
            {#each PriorityArray as priority}
              <Option value={priority}>{priority}</Option>
            {/each}
          </Select>
        </Cell>
        <Cell>
          <Select label="Status" style="width:100%" bind:value={filter.Status}>
            {#each StatusArray as status}
              <Option value={status}>{status}</Option>
            {/each}
          </Select>
        </Cell>
        <Cell>
          <Select label="Type" style="width:100%" bind:value={filter.Type}>
            {#each IssueTypeArray as type}
              <Option value={type}>{type}</Option>
            {/each}
          </Select>
        </Cell>
        <Cell>
          <Select label="Complexity" style="width:100%" bind:value={filter.Complexity}>
            {#each ComplexityArray as complexity}
              <Option value={complexity}>{complexity}</Option>
            {/each}
          </Select>
        </Cell>
        <Cell>
          <Select bind:value={filter.AuthorId} label="Author" style="width:100%">
            {#each users as user}
              <Option value={user.Id}>{user.Name.First} {user.Name.Last}</Option>
            {/each}
          </Select>
        </Cell>
        <Cell>
          <Select bind:value={filter.AssignedToId} label="Assigned" style="width:100%">
            {#each users as user}
              <Option value={user.Id}>{user.Name.First} {user.Name.Last}</Option>
            {/each}
          </Select>
        </Cell>
      </LayoutGrid>
    </Content>
  </Panel>
</Accordion>
