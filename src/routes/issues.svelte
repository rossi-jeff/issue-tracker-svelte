<script>
  import {  onMount } from 'svelte';
  import { baseUrl } from '../lib';
  import { CardIssue } from '../components/cards';
  import IconButton, { Icon } from '@smui/icon-button';

  /**
* @type {any[]}
*/
  let issues = [];

  onMount(async () => {
    let url = `${baseUrl}/issue`;
    const results = await fetch(url);
    if (results.ok) {
      issues = await results.json()
    }
  });
</script>

<svelte:head>
	<title>Issue Tracker in Svelte | Issues</title>
</svelte:head>

<IconButton href="/issues/new" title="Add a New Issue">
  <Icon class="material-icons">add_circle_outline</Icon>
</IconButton>

{#each issues as issue}
  <CardIssue {issue} />
{/each}