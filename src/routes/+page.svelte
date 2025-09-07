<div class="home">
	<div class="hero">
		<h1>Welcome to Mosaic</h1>
		<p class="hero-subtitle">Build Progressive Web Apps with MCP-powered widgets</p>

		<div class="hero-description">
			<p>
				Mosaic is a template-based no-code builder that lets you create custom PWAs by combining
				widgets from various Model Context Protocol (MCP) servers. Think of it like customizing
				your phone's home screen, but for web applications.
			</p>
		</div>

		<div class="quick-actions">
			<a href="/create" class="btn btn-primary">
				<span>✨</span>
				Start Creating
			</a>
			<a href="/registry" class="btn btn-secondary">
				<span>🔧</span>
				Browse MCP Registry
			</a>
		</div>
	</div>

	<div class="features">
		<div class="feature-card">
			<div class="feature-icon">🎨</div>
			<h3>Template-Based</h3>
			<p>Choose from pre-built templates and customize them with drag-and-drop widgets</p>
		</div>

		<div class="feature-card">
			<div class="feature-icon">🔌</div>
			<h3>MCP Integration</h3>
			<p>Connect to various MCP servers to add weather, calendar, finance, and other widgets</p>
		</div>

		<div class="feature-card">
			<div class="feature-icon">📱</div>
			<h3>PWA Ready</h3>
			<p>Export your creation as a fully functional Progressive Web App</p>
		</div>
	</div>
</div>

<style>
	.home {
		max-width: 1200px;
		margin: 0 auto;
	}

	.hero {
		text-align: center;
		margin-bottom: 4rem;
	}

	.hero h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		color: #333;
	}

	.hero-subtitle {
		font-size: 1.25rem;
		color: #666;
		margin-bottom: 2rem;
	}

	.hero-description {
		max-width: 600px;
		margin: 0 auto 2rem auto;
	}

	.hero-description p {
		font-size: 1.1rem;
		line-height: 1.6;
		color: #555;
	}

	.quick-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 2rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		text-decoration: none;
		border-radius: 0.5rem;
		font-weight: 600;
		transition: all 0.2s ease;
	}

	.btn-primary {
		background: #00d4ff;
		color: #000;
	}

	.btn-primary:hover {
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
		transform: translateY(-1px);
	}

	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-top: 4rem;
	}

	.feature-card {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.feature-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.feature-card h3 {
		margin-bottom: 1rem;
		color: #333;
	}

	.feature-card p {
		color: #666;
		line-height: 1.6;
	}
</style>
