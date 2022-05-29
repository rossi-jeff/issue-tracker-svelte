<script>
  import { FormTimeClock } from '../../components/forms';
  import Card, { Content, Actions } from '@smui/card';
  import Button, { Label } from '@smui/button';

  let timeclock = {
		UserId: 0,
		ProjectId: 0,
		IssueId: 0,
		Start: {
			Date: '',
			Time: ''
		},
		End: {
			Date: '',
			Time: ''
		}
	};

  const clicked = () => {
    console.log(timeclock);
  }
</script>



<Card>
  <Content>
    <FormTimeClock {timeclock} />
  </Content>
  <Actions fullBleed>
    <Button on:click={clicked}>
      <Label>Save Time Clock</Label>
      <i class="material-icons" aria-hidden="true">save</i>
    </Button>
  </Actions>
</Card>