<script>
  export /**
* @type {{ Title: any; Details: any; UUID: any; Name: any; }}
*/
   let issue;
  import Card, { Content, Actions } from '@smui/card';
  import IconButton, { Icon } from '@smui/icon-button';
</script>

<Card variant="outlined" padded class="z-1">
  <Content>
    <h4>{issue.Title}</h4>
    <div>{issue.Details}</div>
  </Content>
  <Actions>
    <IconButton href="/issues/{issue.UUID}" title="Edit Issue: {issue.Name}">
      <Icon class="material-icons">edit</Icon>
    </IconButton>
  </Actions>
</Card>