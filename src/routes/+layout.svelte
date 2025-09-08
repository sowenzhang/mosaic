<script lang="ts">
	import '../app.css';
	import '$lib/styles/layout.css';
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
