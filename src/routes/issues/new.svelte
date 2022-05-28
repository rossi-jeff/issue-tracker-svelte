<script>
  import { FormIssue } from '../../components/forms';
  import Card, { Content, Actions } from '@smui/card';
  import Button, { Label } from '@smui/button';
  let issue = {
    Title: '',
    Details: '',
    ProjectId: 0,
    AssignedToId: 0,
    Priority: '',
    Status: '',
    Type: '',
    Complexity: ''
  }

  const clicked = () => {
    console.log(issue);
  }
</script>

<Card>
  <Content>
    <FormIssue {issue} />
  </Content>
  <Actions fullBleed>
    <Button on:click={clicked}>
      <Label>Save Issue</Label>
      <i class="material-icons" aria-hidden="true">save</i>
    </Button>
  </Actions>
</Card>