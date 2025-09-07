<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Mosaic - MCP-Powered PWA Builder</title>
</svelte:head>

<div class="app">
	<nav class="sidebar">
		<div class="nav-header">
			<h2>Mosaic</h2>
			<p class="nav-subtitle">PWA Builder</p>
		</div>

		<ul class="nav-menu">
			<li>
				<a href="/" class:active={$page.url.pathname === '/'}>
					<span class="nav-icon">🏠</span>
					Home
				</a>
			</li>
			<li>
				<a href="/create" class:active={$page.url.pathname === '/create'}>
					<span class="nav-icon">✨</span>
					Create
				</a>
			</li>
			<li>
				<a href="/registry" class:active={$page.url.pathname === '/registry'}>
					<span class="nav-icon">🔧</span>
					MCP Registry
				</a>
			</li>
			<li>
				<a href="/apps" class:active={$page.url.pathname === '/apps'}>
					<span class="nav-icon">📱</span>
					Browse Apps
				</a>
			</li>
		</ul>
	</nav>

	<main class="content">
		{@render children?.()}
	</main>
</div>

<style>
	.app {
		display: flex;
		min-height: 100vh;
	}

	.sidebar {
		width: 250px;
		background: #1a1a1a;
		color: white;
		padding: 1.5rem;
		border-right: 1px solid #333;
	}

	.nav-header {
		margin-bottom: 2rem;
		border-bottom: 1px solid #333;
		padding-bottom: 1rem;
	}

	.nav-header h2 {
		margin: 0;
		font-size: 1.5rem;
		color: #00d4ff;
	}

	.nav-subtitle {
		margin: 0.25rem 0 0 0;
		font-size: 0.875rem;
		color: #888;
	}

	.nav-menu {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.nav-menu li {
		margin-bottom: 0.5rem;
	}

	.nav-menu a {
		display: flex;
		align-items: center;
		padding: 0.75rem 1rem;
		text-decoration: none;
		color: #ccc;
		border-radius: 0.5rem;
		transition: all 0.2s ease;
	}

	.nav-menu a:hover {
		background: #333;
		color: white;
	}

	.nav-menu a.active {
		background: #00d4ff;
		color: #000;
	}

	.nav-icon {
		margin-right: 0.75rem;
		font-size: 1.1rem;
	}

	.content {
		flex: 1;
		padding: 2rem;
		background: #fafafa;
	}
</style>
