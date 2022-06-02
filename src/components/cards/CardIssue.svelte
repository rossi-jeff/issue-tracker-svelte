<script>
  export /**
* @type {{ SequenceNumber: any; Title: any; Project: { Name: any; }; Priority: any; Status: any; Type: any; Complexity: any; Details: any; Created: any; Author: { Name: { Salutation: any; First: any; Middle: any; Last: any; Suffix: string; }; }; AssignedTo: { Name: { Salutation: any; First: any; Middle: any; Last: any; Suffix: string; }; }; UUID: any; Name: any; }}
*/
   let issue;
  import Card, { Content, Actions } from '@smui/card';
  import IconButton, { Icon } from '@smui/icon-button';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { FormatName } from '../../lib';
</script>

<Card variant="outlined" padded class="issue-card">
  <Content>
    <h2>{issue.SequenceNumber}</h2>
    <h4>{issue.Title}</h4>
    {#if issue.Project}
    <div>
      <strong style="margin-right: 1.5em;">Project</strong>
      {issue.Project.Name}
    </div>
    {/if}
    <LayoutGrid style="padding: 1em 0 1em 0">
      <Cell span={3}>
        <strong>Priority</strong>
        {issue.Priority}
      </Cell>
      <Cell span={3}>
        <strong>Status</strong>
        {issue.Status}
      </Cell>
      <Cell span={3}>
        <strong>Type</strong>
        {issue.Type}
      </Cell>
      <Cell span={3}>
        <strong>Complexity</strong>
        {issue.Complexity}
      </Cell>
    </LayoutGrid>
    <div>{issue.Details}</div>
    <LayoutGrid style="padding: 1em 0 1em 0">
      <Cell span={4}>
        <strong>Created</strong>
        {issue.Created}
      </Cell>
      <Cell span={4}>
        <strong>Author</strong>
        {#if issue.Author}
          {FormatName(issue.Author.Name)}
        {/if}
      </Cell>
      <Cell span={4}>
        <strong>Assigned To</strong>
        {#if issue.AssignedTo}
          {FormatName(issue.AssignedTo.Name)}
        {/if}
      </Cell>
    </LayoutGrid>
  </Content>
  <Actions>
    <IconButton href="/issues/{issue.UUID}" title="Edit Issue: {issue.Name}">
      <Icon class="material-icons">edit</Icon>
    </IconButton>
  </Actions>
</Card>