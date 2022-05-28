<script>
  import { FormProject } from '../../components/forms';
  import Card, { Content, Actions } from '@smui/card';
  import Button, { Label } from '@smui/button';
  export /**
* @type {{ Name: string; Details: string; }}
*/
   let project;

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
      <Label>Update Project</Label>
      <i class="material-icons" aria-hidden="true">save</i>
    </Button>
  </Actions>
</Card>
