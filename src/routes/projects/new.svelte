<script>
  import { FormProject } from '../../components/forms';
  import Card, { Content, Actions } from '@smui/card';
  import Button, { Label } from '@smui/button';
  let project = {
    Name: '',
    Details: ''
  }

  const clicked = () => {
    console.log(project);
  }
</script>

<Card>
  <Content>
    <FormProject {project} />
  </Content>
  <Actions fullBleed>
    <Button on:click={clicked}>
      <Label>Save Project</Label>
      <i class="material-icons" aria-hidden="true">save</i>
    </Button>
  </Actions>
</Card>
