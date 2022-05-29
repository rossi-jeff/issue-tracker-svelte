<script>
  import {  onMount } from 'svelte';
  import { baseUrl } from '../lib';
  import { TableTimeClock } from '../components/tables';
  import IconButton, { Icon } from '@smui/icon-button'

  /**
* @type {any[]}
*/
  let timeclocks = [];

  onMount(async () => {
    let url = `${baseUrl}/timeclock`;
    const results = await fetch(url);
    if (results.ok) {
      timeclocks = await results.json()
    }
  });
</script>

<svelte:head>
	<title>Issue Tracker in Svelte | Time Clocks</title>
</svelte:head>

<IconButton href="/timeclocks/new" title="Add a New Time Clock">
  <Icon class="material-icons">add_circle_outline</Icon>
</IconButton>

<TableTimeClock {timeclocks} />