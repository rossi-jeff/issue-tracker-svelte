<script>
  import {  onMount } from 'svelte';
  import { baseUrl } from '../lib';
  import { CardProject } from '../components/cards';
  import IconButton, { Icon } from '@smui/icon-button';

  /**
* @type {any[]}
*/
  let projects = [];

  onMount(async () => {
    let url = `${baseUrl}/project`;
    const results = await fetch(url);
    if (results.ok) {
      projects = await results.json()
    }
  });
</script>

<svelte:head>
	<title>Issue Tracker in Svelte | Projects</title>
</svelte:head>

<IconButton href="/projects/new" title="Add a New Project">
  <Icon class="material-icons">add_circle_outline</Icon>
</IconButton>

{#each projects as project}
  <CardProject {project} />
{/each}