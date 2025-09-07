<script lang="ts">
	let showAddForm = false;

	// Mock data for existing MCP servers
	let mcpServers = [
		{
			id: '1',
			name: 'Weather Service',
			description: 'Provides weather widgets with current conditions and forecasts',
			url: 'https://weather-mcp.example.com',
			widgets: ['Current Weather', 'Weather Forecast', 'Weather Map'],
			status: 'active'
		},
		{
			id: '2',
			name: 'Calendar Service',
			description: 'Calendar and scheduling widgets',
			url: 'https://calendar-mcp.example.com',
			widgets: ['Daily Calendar', 'Event List', 'Month View'],
			status: 'active'
		},
		{
			id: '3',
			name: 'Currency Exchange',
			description: 'Real-time currency exchange rates and conversion tools',
			url: 'https://currency-mcp.example.com',
			widgets: ['Exchange Rates', 'Currency Converter', 'Rate Chart'],
			status: 'active'
		}
	];

	let newServer = {
		name: '',
		description: '',
		url: ''
	};

	function toggleAddForm() {
		showAddForm = !showAddForm;
		if (!showAddForm) {
			newServer = { name: '', description: '', url: '' };
		}
	}

	function addServer() {
		if (newServer.name && newServer.url) {
			mcpServers = [...mcpServers, {
				id: Date.now().toString(),
				...newServer,
				widgets: [],
				status: 'pending'
			}];
			toggleAddForm();
		}
	}

	function removeServer(id: string) {
		mcpServers = mcpServers.filter(server => server.id !== id);
	}
</script>

<div class="registry-page">
	<div class="page-header">
		<h1>MCP Registry</h1>
		<p>Manage and browse Model Context Protocol servers</p>

		<button class="btn btn-primary" on:click={toggleAddForm}>
			<span>+</span>
			Register New MCP Server
		</button>
	</div>

	{#if showAddForm}
		<div class="add-form">
			<h2>Register New MCP Server</h2>
			<form on:submit|preventDefault={addServer}>
				<div class="form-group">
					<label for="server-name">Server Name</label>
					<input
						id="server-name"
						type="text"
						bind:value={newServer.name}
						placeholder="e.g., Weather Service"
						required
					>
				</div>

				<div class="form-group">
					<label for="server-description">Description</label>
					<textarea
						id="server-description"
						bind:value={newServer.description}
						placeholder="Describe what widgets this server provides"
						rows="3"
					></textarea>
				</div>

				<div class="form-group">
					<label for="server-url">Server URL</label>
					<input
						id="server-url"
						type="url"
						bind:value={newServer.url}
						placeholder="https://your-mcp-server.com"
						required
					>
				</div>

				<div class="form-actions">
					<button type="submit" class="btn btn-primary">Add Server</button>
					<button type="button" class="btn btn-secondary" on:click={toggleAddForm}>Cancel</button>
				</div>
			</form>
		</div>
	{/if}

	<div class="servers-grid">
		{#each mcpServers as server}
			<div class="server-card">
				<div class="server-header">
					<h3>{server.name}</h3>
					<span class="status status-{server.status}">{server.status}</span>
				</div>

				<p class="server-description">{server.description}</p>

				<div class="server-url">
					<strong>URL:</strong> <code>{server.url}</code>
				</div>

				{#if server.widgets.length > 0}
					<div class="widgets-list">
						<strong>Available Widgets:</strong>
						<ul>
							{#each server.widgets as widget}
								<li>{widget}</li>
							{/each}
						</ul>
					</div>
				{/if}

				<div class="server-actions">
					<button class="btn btn-small" disabled={server.status !== 'active'}>
						Test Connection
					</button>
					<button class="btn btn-small btn-danger" on:click={() => removeServer(server.id)}>
						Remove
					</button>
				</div>
			</div>
		{/each}

		{#if mcpServers.length === 0}
			<div class="empty-state">
				<div class="empty-icon">🔧</div>
				<h3>No MCP Servers Registered</h3>
				<p>Add your first MCP server to start building with widgets</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.registry-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.page-header h1 {
		font-size: 2.5rem;
		color: #333;
		margin: 0;
	}

	.page-header p {
		color: #666;
		margin: 0;
		flex-basis: 100%;
	}

	.add-form {
		background: white;
		border-radius: 1rem;
		padding: 2rem;
		margin-bottom: 2rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.add-form h2 {
		margin-top: 0;
		color: #333;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #333;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid #ddd;
		border-radius: 0.5rem;
		font-size: 1rem;
		transition: border-color 0.2s ease;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #00d4ff;
	}

	.form-actions {
		display: flex;
		gap: 1rem;
	}

	.servers-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: 1.5rem;
	}

	.server-card {
		background: white;
		border-radius: 1rem;
		padding: 1.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.server-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.server-header h3 {
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

	.status-active {
		background: #d4edda;
		color: #155724;
	}

	.status-pending {
		background: #fff3cd;
		color: #856404;
	}

	.server-description {
		color: #666;
		margin-bottom: 1rem;
		line-height: 1.5;
	}

	.server-url {
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}

	.server-url code {
		background: #f8f9fa;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-family: monospace;
	}

	.widgets-list {
		margin-bottom: 1.5rem;
	}

	.widgets-list ul {
		margin: 0.5rem 0 0 0;
		padding-left: 1.5rem;
	}

	.widgets-list li {
		color: #666;
		margin-bottom: 0.25rem;
	}

	.server-actions {
		display: flex;
		gap: 0.5rem;
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

	.btn:hover:not(:disabled) {
		background: #00b8e6;
		transform: translateY(-1px);
	}

	.btn:disabled {
		background: #ccc;
		cursor: not-allowed;
		transform: none;
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
		padding: 3rem;
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
</style>
