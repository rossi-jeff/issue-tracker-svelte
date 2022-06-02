<script>
	import Card, { Content } from '@smui/card';
	import { crumbs } from '../../lib';
</script>

{#if $crumbs.length}
	<Card class="bread-crumb-trail">
		<Content>
			{#each $crumbs as crumb, idx}
				{#if crumb.href}
					<a href={crumb.href}>{crumb.text}</a>
				{:else}
					<strong>{crumb.text}</strong>
				{/if}
				{#if idx < $crumbs.length - 1}
					<strong class="crumb-spacer">&gt;</strong>
				{/if}
			{/each}
		</Content>
	</Card>
{/if}
