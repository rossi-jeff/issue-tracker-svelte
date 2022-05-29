<script>
  import {  onMount } from 'svelte';
  import { baseUrl } from '../lib';
  import { CardIssue } from '../components/cards';
  import { FilterIssue } from '../components/filters';
  import Card, { Content } from '@smui/card';

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

<Card style="z-index: 9999;">
  <Content>
    <FilterIssue />
  </Content>
</Card>

{#each issues as issue}
  <CardIssue {issue} />
{/each}