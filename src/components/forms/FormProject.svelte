<script>
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	export /**
	 * @type {{ Name: string; Details: string; }}
	 */
	let project;
</script>

<div class="margins">
	<Textfield
		style="width: 100%;"
		helperLine$style="width: 100%;"
		bind:value={project.Name}
		label="Name"
	>
		<HelperText slot="helper">Enter Project Name</HelperText>
	</Textfield>
</div>

<div>
	<Textfield
		style="width: 100%;"
		helperLine$style="width: 100%;"
		textarea
		bind:value={project.Details}
		label="Details"
	>
		<HelperText slot="helper">Enter Project Details</HelperText>
	</Textfield>
</div>
