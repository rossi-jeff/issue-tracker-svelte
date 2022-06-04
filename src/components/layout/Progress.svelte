<script>
	import LinearProgress from '@smui/linear-progress';
	import { progress } from '../../lib';
	/**
	 * @type {boolean}
	 */
	let progressVisible;
	progress.subscribe((value) => {
		progressVisible = value;
	});
</script>

{#if progressVisible}
	<LinearProgress indeterminate />
{/if}
