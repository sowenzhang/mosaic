<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	interface Widget {
		id: number;
		name: string;
		description: string;
		category: string;
		serverName: string;
		icon: string;
	}

	let template = '';
	let selectedWidgetSlot: number | null = null;
	let showWidgetPanel = false;
	let availableWidgets: Widget[] = [];
	let placedWidgets: Record<number, Widget> = {};

	// Mock widget data (in real app, this would come from the database)
	const mockWidgets: Widget[] = [
		{
			id: 1,
			name: 'Current Weather',
			description: 'Shows current weather conditions',
			category: 'weather',
			serverName: 'Weather Service',
			icon: '🌤️'
		},
		{
			id: 2,
			name: 'Weather Forecast',
			description: '5-day weather forecast',
			category: 'weather',
			serverName: 'Weather Service',
			icon: '📊'
		},
		{
			id: 3,
			name: 'Daily Calendar',
			description: 'Shows today\'s events',
			category: 'calendar',
			serverName: 'Calendar Service',
			icon: '📅'
		},
		{
			id: 4,
			name: 'Exchange Rates',
			description: 'Live currency rates',
			category: 'finance',
			serverName: 'Currency Exchange',
			icon: '💱'
		},
		{
			id: 5,
			name: 'News Headlines',
			description: 'Latest news headlines',
			category: 'news',
			serverName: 'News Service',
			icon: '📰'
		},
		{
			id: 6,
			name: 'Task List',
			description: 'Simple todo list',
			category: 'productivity',
			serverName: 'Task Manager',
			icon: '✅'
		}
	];

	onMount(() => {
		template = $page.url.searchParams.get('template') || 'three-row';
		availableWidgets = mockWidgets;
	});

	function openWidgetPanel(slotIndex: number) {
		selectedWidgetSlot = slotIndex;
		showWidgetPanel = true;
	}

	function closeWidgetPanel() {
		showWidgetPanel = false;
		selectedWidgetSlot = null;
	}

	function selectWidget(widget: Widget) {
		if (selectedWidgetSlot !== null) {
			placedWidgets[selectedWidgetSlot] = widget;
			placedWidgets = { ...placedWidgets }; // Trigger reactivity
		}
		closeWidgetPanel();
	}

	function removeWidget(slotIndex: number) {
		delete placedWidgets[slotIndex];
		placedWidgets = { ...placedWidgets };
	}

	function saveApp() {
		// TODO: Save the app configuration
		console.log('Saving app with template:', template, 'and widgets:', placedWidgets);
		alert('App saved successfully! (This is a demo)');
	}

	// Group widgets by category for easier browsing
	$: groupedWidgets = availableWidgets.reduce((groups, widget) => {
		const category = widget.category;
		if (!groups[category]) {
			groups[category] = [];
		}
		groups[category].push(widget);
		return groups;
	}, {} as Record<string, Widget[]>);

	function getWidgetSlots() {
		return [0, 1, 2];
	}
</script>

<div class="builder-page">
	<div class="builder-header">
		<div class="header-content">
			<a href="/create" class="back-link">← Back to Templates</a>
			<h1>App Builder</h1>
			<div class="template-info">
				Template: <strong>{template === 'three-row' ? '3-Row Layout' : '2+1 Layout'}</strong>
			</div>
		</div>

		<div class="header-actions">
			<button class="btn btn-secondary">Preview</button>
			<button class="btn btn-primary" on:click={saveApp}>Save App</button>
		</div>
	</div>

	<div class="builder-content">
		<div class="phone-canvas">
			<div class="phone-frame">
				<div class="phone-screen">
					<div class="phone-header">
						<div class="status-bar">
							<span class="time">9:41</span>
							<div class="status-icons">
								<span>📶</span>
								<span>🔋</span>
							</div>
						</div>
					</div>

					<div class="app-content {template}">
						{#if template === 'three-row'}
							{#each getWidgetSlots() as slotIndex}
								<div class="widget-slot" class:filled={placedWidgets[slotIndex]}>
									{#if placedWidgets[slotIndex]}
										<div class="placed-widget">
											<div class="widget-header">
												<span class="widget-icon">{placedWidgets[slotIndex].icon}</span>
												<span class="widget-name">{placedWidgets[slotIndex].name}</span>
												<button class="remove-widget" on:click={() => removeWidget(slotIndex)}>×</button>
											</div>
											<div class="widget-preview">
												<div class="mock-content"></div>
											</div>
										</div>
									{:else}
										<button class="add-widget" on:click={() => openWidgetPanel(slotIndex)}>
											<span class="plus-icon">+</span>
											<span>Add Widget</span>
										</button>
									{/if}
								</div>
							{/each}
						{:else if template === 'two-column-plus'}
							<div class="top-row">
								{#each [0, 1] as slotIndex}
									<div class="widget-slot small" class:filled={placedWidgets[slotIndex]}>
										{#if placedWidgets[slotIndex]}
											<div class="placed-widget">
												<div class="widget-header">
													<span class="widget-icon">{placedWidgets[slotIndex].icon}</span>
													<span class="widget-name">{placedWidgets[slotIndex].name}</span>
													<button class="remove-widget" on:click={() => removeWidget(slotIndex)}>×</button>
												</div>
												<div class="widget-preview small-preview">
													<div class="mock-content"></div>
												</div>
											</div>
										{:else}
											<button class="add-widget small" on:click={() => openWidgetPanel(slotIndex)}>
												<span class="plus-icon">+</span>
												<span>Add</span>
											</button>
										{/if}
									</div>
								{/each}
							</div>
							<div class="widget-slot large" class:filled={placedWidgets[2]}>
								{#if placedWidgets[2]}
									<div class="placed-widget">
										<div class="widget-header">
											<span class="widget-icon">{placedWidgets[2].icon}</span>
											<span class="widget-name">{placedWidgets[2].name}</span>
											<button class="remove-widget" on:click={() => removeWidget(2)}>×</button>
										</div>
										<div class="widget-preview">
											<div class="mock-content"></div>
										</div>
									</div>
								{:else}
									<button class="add-widget" on:click={() => openWidgetPanel(2)}>
										<span class="plus-icon">+</span>
										<span>Add Widget</span>
									</button>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

		{#if showWidgetPanel}
			<div class="widget-panel">
				<div class="panel-header">
					<h3>Choose a Widget</h3>
					<button class="close-panel" on:click={closeWidgetPanel}>×</button>
				</div>

				<div class="panel-content">
					{#each Object.entries(groupedWidgets) as [category, widgets]}
						<div class="widget-category">
							<h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
							<div class="widget-list">
								{#each widgets as widget}
									<button class="widget-item" on:click={() => selectWidget(widget)}>
										<div class="widget-item-icon">{widget.icon}</div>
										<div class="widget-item-info">
											<div class="widget-item-name">{widget.name}</div>
											<div class="widget-item-description">{widget.description}</div>
											<div class="widget-item-server">{widget.serverName}</div>
										</div>
									</button>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.builder-page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: #f5f5f5;
	}

	.builder-header {
		background: white;
		border-bottom: 1px solid #ddd;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.back-link {
		color: #666;
		text-decoration: none;
		font-weight: 500;
	}

	.back-link:hover {
		color: #00d4ff;
	}

	.builder-header h1 {
		margin: 0;
		color: #333;
	}

	.template-info {
		color: #666;
		font-size: 0.9rem;
	}

	.header-actions {
		display: flex;
		gap: 1rem;
	}

	.builder-content {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		position: relative;
	}

	.phone-canvas {
		position: relative;
		z-index: 1;
	}

	.phone-frame {
		width: 320px;
		height: 640px;
		background: #333;
		border-radius: 2rem;
		padding: 1rem;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
	}

	.phone-screen {
		width: 100%;
		height: 100%;
		background: white;
		border-radius: 1.5rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.phone-header {
		background: #000;
		color: white;
		padding: 0.5rem 1rem;
	}

	.status-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.status-icons {
		display: flex;
		gap: 0.5rem;
	}

	.app-content {
		flex: 1;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.app-content.two-column-plus {
		gap: 1rem;
	}

	.top-row {
		display: flex;
		gap: 1rem;
		height: 120px;
	}

	.widget-slot {
		border: 2px dashed #ddd;
		border-radius: 0.5rem;
		min-height: 120px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fafafa;
		transition: all 0.2s ease;
	}

	.widget-slot.small {
		flex: 1;
		min-height: 120px;
	}

	.widget-slot.large {
		min-height: 200px;
	}

	.widget-slot.filled {
		border: 2px solid #00d4ff;
		background: white;
	}

	.add-widget {
		background: none;
		border: none;
		color: #999;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		transition: color 0.2s ease;
		width: 100%;
		height: 100%;
	}

	.add-widget:hover {
		color: #00d4ff;
	}

	.add-widget.small {
		font-size: 0.8rem;
	}

	.plus-icon {
		font-size: 2rem;
		font-weight: 300;
	}

	.placed-widget {
		width: 100%;
		height: 100%;
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
	}

	.widget-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.widget-icon {
		font-size: 1.2rem;
	}

	.widget-name {
		flex: 1;
		font-weight: 600;
		font-size: 0.9rem;
		color: #333;
	}

	.remove-widget {
		background: #ff4444;
		color: white;
		border: none;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		cursor: pointer;
		font-size: 0.8rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.widget-preview {
		flex: 1;
		background: #f8f9fa;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.widget-preview.small-preview {
		min-height: 60px;
	}

	.mock-content {
		width: 60%;
		height: 60%;
		background: linear-gradient(45deg, #e0e0e0 25%, transparent 25%),
					linear-gradient(-45deg, #e0e0e0 25%, transparent 25%),
					linear-gradient(45deg, transparent 75%, #e0e0e0 75%),
					linear-gradient(-45deg, transparent 75%, #e0e0e0 75%);
		background-size: 8px 8px;
		background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
		border-radius: 0.25rem;
	}

	.widget-panel {
		position: fixed;
		right: 0;
		top: 0;
		height: 100vh;
		width: 400px;
		background: white;
		box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		z-index: 10;
	}

	.panel-header {
		padding: 1.5rem;
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.panel-header h3 {
		margin: 0;
		color: #333;
	}

	.close-panel {
		background: none;
		border: none;
		font-size: 1.5rem;
		color: #999;
		cursor: pointer;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-panel:hover {
		background: #f0f0f0;
		color: #333;
	}

	.panel-content {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
	}

	.widget-category {
		margin-bottom: 2rem;
	}

	.widget-category h4 {
		margin: 0 0 1rem 0;
		color: #333;
		font-size: 1rem;
		text-transform: uppercase;
		font-weight: 600;
		letter-spacing: 0.5px;
	}

	.widget-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.widget-item {
		background: white;
		border: 2px solid #f0f0f0;
		border-radius: 0.5rem;
		padding: 1rem;
		cursor: pointer;
		text-align: left;
		display: flex;
		align-items: center;
		gap: 1rem;
		transition: all 0.2s ease;
	}

	.widget-item:hover {
		border-color: #00d4ff;
		transform: translateY(-1px);
	}

	.widget-item-icon {
		font-size: 2rem;
		min-width: 50px;
		text-align: center;
	}

	.widget-item-info {
		flex: 1;
	}

	.widget-item-name {
		font-weight: 600;
		color: #333;
		margin-bottom: 0.25rem;
	}

	.widget-item-description {
		font-size: 0.9rem;
		color: #666;
		margin-bottom: 0.25rem;
	}

	.widget-item-server {
		font-size: 0.8rem;
		color: #999;
		font-style: italic;
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
		font-size: 0.9rem;
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
</style>
