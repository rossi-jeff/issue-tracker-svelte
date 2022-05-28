<script>
  import {  onMount } from 'svelte';
  import { baseUrl } from '../lib';
  import { CardUser } from '../components/cards';
  import IconButton, { Icon } from '@smui/icon-button';

  /**
* @type {any[]}
*/
  let users = [];

  onMount(async () => {
    let url = `${baseUrl}/user`;
    const results = await fetch(url);
    if (results.ok) {
      users = await results.json()
    }
  });
</script>

<svelte:head>
	<title>Issue Tracker in Svelte | Users</title>
</svelte:head>

<IconButton href="/users/new" title="Add a New User">
  <Icon class="material-icons">add_circle_outline</Icon>
</IconButton>

{#each users as user}
  <CardUser {user} />
{/each}