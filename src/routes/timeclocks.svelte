<script>
  import {  onMount } from 'svelte';
  import { baseUrl } from '../lib';

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

{#each timeclocks as timeclock}
	<div>
    { timeclock.Start.Date } @
    { timeclock.Start.Time }
    to
    { timeclock.End.Date } @
    { timeclock.End.Time } 
  </div>
{/each}