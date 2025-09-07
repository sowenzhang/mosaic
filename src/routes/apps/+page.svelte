<script lang="ts">
	// Mock data for created apps
	let apps = [
		{
			id: '1',
			name: 'Travel Pal',
			description: 'Complete travel companion with weather, currency, and local info',
			template: '3-Row Layout',
			widgets: ['Weather Widget', 'Currency Converter', 'Local Events'],
			createdAt: '2025-09-05',
			status: 'published',
			thumbnail: 'travel-pal'
		},
		{
			id: '2',
			name: 'Dashboard Pro',
			description: 'Business dashboard with analytics and calendar',
			template: '2+1 Layout',
			widgets: ['Analytics Chart', 'Team Calendar', 'Task List'],
			createdAt: '2025-09-04',
			status: 'draft',
			thumbnail: 'dashboard-pro'
		},
		{
			id: '3',
			name: 'Home Control',
			description: 'Smart home control center',
			template: '3-Row Layout',
			widgets: ['Temperature Control', 'Security Cameras', 'Energy Monitor'],
			createdAt: '2025-09-03',
			status: 'published',
			thumbnail: 'home-control'
		}
	];

	function editApp(id: string) {
		console.log('Editing app:', id);
		// TODO: Navigate to editor
	}

	function shareApp(id: string) {
		const app = apps.find(a => a.id === id);
		if (app) {
			// TODO: Generate shareable URL
			navigator.clipboard.writeText(`https://mosaic.app/shared/${id}`);
			alert(`Share URL copied to clipboard for ${app.name}!`);
		}
	}

	function deleteApp(id: string) {
		if (confirm('Are you sure you want to delete this app?')) {
			apps = apps.filter(app => app.id !== id);
		}
	}

	function duplicateApp(id: string) {
		const original = apps.find(a => a.id === id);
		if (original) {
			const duplicate = {
				...original,
				id: Date.now().toString(),
				name: `${original.name} (Copy)`,
				status: 'draft',
				createdAt: new Date().toISOString().split('T')[0]
			};
			apps = [duplicate, ...apps];
		}
	}
</script>

<div class="apps-page">
	<div class="page-header">
		<div>
			<h1>Browse Apps</h1>
			<p>Manage your created PWAs and share them with others</p>
		</div>

		<a href="/create" class="btn btn-primary">
			<span>+</span>
			Create New App
		</a>
	</div>

	<div class="filters">
		<div class="filter-group">
			<label for="status-filter">Status:</label>
			<select id="status-filter">
				<option value="all">All Apps</option>
				<option value="published">Published</option>
				<option value="draft">Drafts</option>
			</select>
		</div>

		<div class="filter-group">
			<label for="template-filter">Template:</label>
			<select id="template-filter">
				<option value="all">All Templates</option>
				<option value="3-Row Layout">3-Row Layout</option>
				<option value="2+1 Layout">2+1 Layout</option>
			</select>
		</div>
	</div>

	<div class="apps-grid">
		{#each apps as app}
			<div class="app-card">
				<div class="app-thumbnail">
					<div class="phone-mockup">
						{#if app.template === '3-Row Layout'}
							<div class="widget-preview"></div>
							<div class="widget-preview"></div>
							<div class="widget-preview"></div>
						{:else if app.template === '2+1 Layout'}
							<div class="widget-row">
								<div class="widget-preview small"></div>
								<div class="widget-preview small"></div>
							</div>
							<div class="widget-preview large"></div>
						{/if}
					</div>
				</div>

				<div class="app-info">
					<div class="app-header">
						<h3>{app.name}</h3>
						<span class="status status-{app.status}">{app.status}</span>
					</div>

					<p class="app-description">{app.description}</p>

					<div class="app-meta">
						<div class="meta-item">
							<strong>Template:</strong> {app.template}
						</div>
						<div class="meta-item">
							<strong>Created:</strong> {app.createdAt}
						</div>
						<div class="meta-item">
							<strong>Widgets:</strong> {app.widgets.length}
						</div>
					</div>

					<div class="widget-tags">
						{#each app.widgets.slice(0, 3) as widget}
							<span class="widget-tag">{widget}</span>
						{/each}
						{#if app.widgets.length > 3}
							<span class="widget-tag more">+{app.widgets.length - 3} more</span>
						{/if}
					</div>
				</div>

				<div class="app-actions">
					<button class="btn btn-small" on:click={() => editApp(app.id)}>
						✏️ Edit
					</button>

					{#if app.status === 'published'}
						<button class="btn btn-small btn-secondary" on:click={() => shareApp(app.id)}>
							🔗 Share
						</button>
					{/if}

					<button class="btn btn-small btn-secondary" on:click={() => duplicateApp(app.id)}>
						📋 Duplicate
					</button>

					<button class="btn btn-small btn-danger" on:click={() => deleteApp(app.id)}>
						🗑️ Delete
					</button>
				</div>
			</div>
		{/each}

		{#if apps.length === 0}
			<div class="empty-state">
				<div class="empty-icon">📱</div>
				<h3>No Apps Created Yet</h3>
				<p>Start building your first PWA with our template wizard</p>
				<a href="/create" class="btn btn-primary">Create Your First App</a>
			</div>
		{/if}
	</div>
</div>

<style>
	.apps-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.page-header h1 {
		font-size: 2.5rem;
		color: #333;
		margin: 0 0 0.5rem 0;
	}

	.page-header p {
		color: #666;
		margin: 0;
	}

	.filters {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		padding: 1rem;
		background: white;
		border-radius: 0.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.filter-group {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.filter-group label {
		font-weight: 600;
		color: #333;
	}

	.filter-group select {
		padding: 0.5rem;
		border: 2px solid #ddd;
		border-radius: 0.25rem;
		background: white;
	}

	.apps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	.app-card {
		background: white;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease;
	}

	.app-card:hover {
		transform: translateY(-2px);
	}

	.app-thumbnail {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.phone-mockup {
		width: 80px;
		height: 140px;
		background: white;
		border-radius: 0.5rem;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.widget-row {
		display: flex;
		gap: 0.5rem;
		height: 20px;
	}

	.widget-preview {
		background: #e0e0e0;
		border-radius: 0.25rem;
		flex: 1;
		height: 20px;
	}

	.widget-preview.small {
		height: 20px;
	}

	.widget-preview.large {
		height: 45px;
	}

	.app-info {
		padding: 1.5rem;
	}

	.app-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.app-header h3 {
		margin: 0;
		color: #333;
	}

	.status {
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.status-published {
		background: #d4edda;
		color: #155724;
	}

	.status-draft {
		background: #fff3cd;
		color: #856404;
	}

	.app-description {
		color: #666;
		margin-bottom: 1rem;
		line-height: 1.5;
	}

	.app-meta {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}

	.meta-item {
		color: #666;
	}

	.widget-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.widget-tag {
		background: #f8f9fa;
		color: #495057;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.8rem;
	}

	.widget-tag.more {
		background: #e9ecef;
		font-weight: 600;
	}

	.app-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 1rem 1.5rem;
		background: #f8f9fa;
		border-top: 1px solid #dee2e6;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
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

	.btn-secondary {
		background: white;
		color: #333;
		border: 2px solid #ddd;
	}

	.btn-secondary:hover {
		border-color: #00d4ff;
	}

	.btn-small {
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
	}

	.btn-danger {
		background: #dc3545;
		color: white;
	}

	.btn-danger:hover {
		background: #c82333;
	}

	.empty-state {
		grid-column: 1 / -1;
		text-align: center;
		padding: 4rem 2rem;
		color: #666;
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.empty-state h3 {
		margin-bottom: 0.5rem;
		color: #333;
	}

	.empty-state p {
		margin-bottom: 2rem;
	}
</style>
