<script>
  export /**
* @type {{ Name: { First: any; Middle: any; Last: any; }; Credentials: { Username: any; }; UUID: any; }}
*/
   let user;
  let fullname = '';
  import Card, { Content, Actions } from '@smui/card';
  import IconButton, { Icon } from '@smui/icon-button';

  const setFullName = () => {
    let parts = []
    if (user.Name.First) parts.push(user.Name.First);
    if (user.Name.Middle) parts.push(user.Name.Middle);
    if (user.Name.Last) parts.push(user.Name.Last);
    fullname = parts.join(' ')
  }

  setFullName();
</script>

<Card variant="outlined" padded>
  <Content>
    <h4>{user.Credentials.Username}</h4>
    <div>{fullname}</div>
  </Content>
  <Actions>
    <IconButton href="/users/{user.UUID}" title="Edit User: {fullname}">
      <Icon class="material-icons">edit</Icon>
    </IconButton>
  </Actions>
</Card>