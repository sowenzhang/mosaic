<script lang="ts">
	let selectedTemplate: string | null = null;

	const templates = [
		{
			id: 'three-row',
			name: '3-Row Layout',
			description: 'Three horizontal widgets stacked vertically',
			preview: 'three-row-preview'
		},
		{
			id: 'two-column-plus',
			name: '2+1 Layout',
			description: 'Two widgets in first row, one large widget below',
			preview: 'two-column-plus-preview'
		}
	];

	function selectTemplate(templateId: string) {
		selectedTemplate = templateId;
	}

	function startBuilding() {
		if (selectedTemplate) {
			// Navigate to builder with selected template
			window.location.href = `/create/builder?template=${selectedTemplate}`;
		}
	}
</script>

<div class="create-page">
	<div class="page-header">
		<h1>Create New App</h1>
		<p>Choose a template to get started with your PWA</p>
	</div>

	<div class="wizard">
		<div class="step">
			<h2>Step 1: Choose a Template</h2>
			<p>Select a layout template for your app. You can customize it with widgets later.</p>

			<div class="templates">
				{#each templates as template}
					<button
						class="template-card"
						class:selected={selectedTemplate === template.id}
						on:click={() => selectTemplate(template.id)}
						type="button"
					>
						<div class="template-preview {template.preview}">
							{#if template.id === 'three-row'}
								<div class="preview-widget"></div>
								<div class="preview-widget"></div>
								<div class="preview-widget"></div>
							{:else if template.id === 'two-column-plus'}
								<div class="preview-row">
									<div class="preview-widget small"></div>
									<div class="preview-widget small"></div>
								</div>
								<div class="preview-widget large"></div>
							{/if}
						</div>

						<div class="template-info">
							<h3>{template.name}</h3>
							<p>{template.description}</p>
						</div>

						{#if selectedTemplate === template.id}
							<div class="selected-indicator">✓</div>
						{/if}
					</button>
				{/each}
			</div>
		</div>

		{#if selectedTemplate}
			<div class="actions">
				<button class="btn btn-primary" on:click={startBuilding}>
					Continue with {templates.find(t => t.id === selectedTemplate)?.name}
					<span>→</span>
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.create-page {
		max-width: 1000px;
		margin: 0 auto;
	}

	.page-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.page-header h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		color: #333;
	}

	.page-header p {
		font-size: 1.1rem;
		color: #666;
	}

	.wizard {
		background: white;
		border-radius: 1rem;
		padding: 2rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.step h2 {
		color: #333;
		margin-bottom: 0.5rem;
	}

	.step p {
		color: #666;
		margin-bottom: 2rem;
	}

	.templates {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.template-card {
		position: relative;
		border: 2px solid #ddd;
		border-radius: 1rem;
		padding: 1.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
		background: #fafafa;
	}

	.template-card:hover {
		border-color: #00d4ff;
		transform: translateY(-2px);
	}

	.template-card.selected {
		border-color: #00d4ff;
		background: #f0fcff;
	}

	.template-preview {
		width: 120px;
		height: 200px;
		margin: 0 auto 1rem auto;
		background: white;
		border: 2px solid #ddd;
		border-radius: 0.5rem;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.preview-row {
		display: flex;
		gap: 0.5rem;
		height: 30px;
	}

	.preview-widget {
		background: #e0e0e0;
		border-radius: 0.25rem;
		flex: 1;
		height: 30px;
	}

	.preview-widget.small {
		height: 30px;
	}

	.preview-widget.large {
		height: 60px;
	}

	.template-info {
		text-align: center;
	}

	.template-info h3 {
		margin-bottom: 0.5rem;
		color: #333;
	}

	.template-info p {
		font-size: 0.9rem;
		color: #666;
		margin: 0;
	}

	.selected-indicator {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: #00d4ff;
		color: white;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		font-weight: bold;
	}

	.actions {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid #eee;
		margin-top: 2rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		background: #00d4ff;
		color: #000;
		text-decoration: none;
		border: none;
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn:hover {
		background: #00b8e6;
		transform: translateY(-1px);
	}
</style>
