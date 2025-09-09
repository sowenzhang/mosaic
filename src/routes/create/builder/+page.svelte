<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import '$lib/styles/builder.css';

	interface Widget {
		id: number;
		name: string;
		description: string;
		category: string;
		serverName: string;
		icon: string;
		height: number; // 1 or 2 rows
		width: number; // 1 (half row) or 2 (full row)
	}

	interface LayoutNode {
		id: string;
		type: 'row' | 'column' | 'widget';
		widget?: Widget;
		children?: LayoutNode[];
		width?: number; // For columns: 1 or 2 (half or full width)
	}

	interface LayoutWidget extends Widget {
		row: number;
		column: number; // 0 or 1 (left or right), or 0 for full width
	}

	let goal = '';
	let availableWidgets: Widget[] = [];
	let layoutTree: LayoutNode[] = [];
	let draggedWidget: Widget | null = null;
	let draggedNode: LayoutNode | null = null;
	let selectedNodeId: string | null = null;

	// Mock widget data that matches the generated widgets
	const allMockWidgets: Record<number, Widget> = {
		1: { id: 1, name: 'Flight Tracker', icon: '✈️', category: 'travel', description: 'Track your flight JL123 and airport updates', serverName: 'Flight Service', height: 1, width: 2 },
		2: { id: 2, name: 'Tokyo Weather', icon: '🌤️', category: 'weather', description: 'Local weather and conditions', serverName: 'Weather Service', height: 1, width: 1 },
		3: { id: 3, name: 'Currency Converter', icon: '💱', category: 'finance', description: 'JPY/USD live exchange rates', serverName: 'Currency Service', height: 1, width: 1 },
		4: { id: 4, name: 'Tokyo Transit', icon: '🚇', category: 'transport', description: 'Subway maps and route planning', serverName: 'Transit Service', height: 2, width: 1 },
		5: { id: 5, name: 'Local Events', icon: '🎌', category: 'entertainment', description: 'Festivals and attractions near you', serverName: 'Events Service', height: 1, width: 1 },
		6: { id: 6, name: 'Translator', icon: '🗣️', category: 'utility', description: 'Real-time Japanese translation', serverName: 'Translation Service', height: 1, width: 2 }
	};

	onMount(() => {
		goal = $page.url.searchParams.get('goal') || '';
		const widgetIds = $page.url.searchParams.get('widgets')?.split(',').map(id => parseInt(id)) || [];

		// Load the specific widgets for this app
		const widgets = widgetIds.map(id => allMockWidgets[id]).filter(Boolean);

		// Initialize layout tree with widgets arranged in rows
		layoutTree = [
			{
				id: 'row-1',
				type: 'row',
				children: widgets.slice(0, 2).map((widget, index) => ({
					id: `widget-${widget.id}`,
					type: 'widget',
					widget,
					width: widget.width
				}))
			},
			{
				id: 'row-2',
				type: 'row',
				children: widgets.slice(2, 4).map((widget, index) => ({
					id: `widget-${widget.id}`,
					type: 'widget',
					widget,
					width: widget.width
				}))
			}
		];

		// Remaining widgets are available for dragging
		availableWidgets = widgets.slice(4);
	});

	function generateId(): string {
		return 'node-' + Math.random().toString(36).substr(2, 9);
	}

	function addRow() {
		layoutTree = [...layoutTree, {
			id: generateId(),
			type: 'row',
			children: []
		}];
	}

	function addWidgetToRow(rowId: string, widget: Widget) {
		layoutTree = layoutTree.map(row => {
			if (row.id === rowId && row.type === 'row') {
				return {
					...row,
					children: [...(row.children || []), {
						id: `widget-${widget.id}`,
						type: 'widget',
						widget,
						width: widget.width
					}]
				};
			}
			return row;
		});

		availableWidgets = availableWidgets.filter(w => w.id !== widget.id);
	}

	function removeWidget(nodeId: string) {
		let removedWidget: Widget | null = null;

		function removeFromTree(nodes: LayoutNode[]): LayoutNode[] {
			return nodes.map(node => {
				if (node.type === 'row' && node.children) {
					const updatedChildren = node.children.filter(child => {
						if (child.id === nodeId && child.widget) {
							removedWidget = child.widget;
							return false;
						}
						return true;
					});
					return { ...node, children: updatedChildren };
				}
				return node;
			});
		}

		layoutTree = removeFromTree(layoutTree);
		if (removedWidget) {
			availableWidgets = [...availableWidgets, removedWidget];
		}
	}

	function moveNode(fromIndex: number, toIndex: number, parentId?: string) {
		// Implementation for moving nodes in the tree
		// This would handle reordering widgets within rows or between rows
	}

	// Drag and Drop Handlers
	function handleDragStart(e: DragEvent, widget: Widget, nodeId?: string) {
		if (!e.dataTransfer) return;

		draggedWidget = widget;
		if (nodeId) {
			draggedNode = { id: nodeId, type: 'widget', widget };
		}

		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', widget.id.toString());

		// Add visual feedback
		if (e.target instanceof HTMLElement) {
			e.target.classList.add('dragging');
		}
	}

	function handleDragEnd(e: DragEvent) {
		// Remove visual feedback
		if (e.target instanceof HTMLElement) {
			e.target.classList.remove('dragging');
		}

		// Clear drag state
		draggedWidget = null;
		draggedNode = null;

		// Remove all drag-over classes
		document.querySelectorAll('.drag-over').forEach(el => {
			el.classList.remove('drag-over');
		});
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		if (e.dataTransfer) {
			e.dataTransfer.dropEffect = 'move';
		}

		// Add visual feedback
		if (e.currentTarget instanceof HTMLElement) {
			e.currentTarget.classList.add('drag-over');
		}
	}

	function handleDragLeave(e: DragEvent) {
		// Remove visual feedback
		if (e.currentTarget instanceof HTMLElement) {
			e.currentTarget.classList.remove('drag-over');
		}
	}

	function handleDropOnRow(e: DragEvent, rowId: string) {
		e.preventDefault();

		// Remove visual feedback
		if (e.currentTarget instanceof HTMLElement) {
			e.currentTarget.classList.remove('drag-over');
		}

		if (!draggedWidget) return;

		// If dragging from another row, remove it first
		if (draggedNode) {
			removeWidget(draggedNode.id);
		}

		// Add widget to the target row
		addWidgetToRow(rowId, draggedWidget);

		// Clear drag state
		draggedWidget = null;
		draggedNode = null;
	}

	function handleDropOnEmptyRow(e: DragEvent, rowId: string) {
		e.preventDefault();
		handleDropOnRow(e, rowId);
	}

	function moveWidgetBetweenRows(sourceNodeId: string, targetRowId: string) {
		let movedWidget: Widget | null = null;

		// Find and remove the widget from source
		layoutTree = layoutTree.map(row => {
			if (row.type === 'row' && row.children) {
				const updatedChildren = row.children.filter(child => {
					if (child.id === sourceNodeId && child.widget) {
						movedWidget = child.widget;
						return false;
					}
					return true;
				});
				return { ...row, children: updatedChildren };
			}
			return row;
		});

		// Add widget to target row
		if (movedWidget) {
			addWidgetToRow(targetRowId, movedWidget);
		}
	}

	function renderPhonePreview(): any[] {
		return layoutTree.map(row => ({
			...row,
			children: row.children || []
		}));
	}	function saveApp() {
		console.log('Saving app layout:', layoutTree);
		alert('App layout saved successfully! (This is a demo)');
	}

	function goToPreview() {
		const widgetIds = layoutTree
			.flatMap(row => row.children || [])
			.map(child => child.widget?.id)
			.filter(Boolean)
			.join(',');

		window.location.href = `/create/preview?goal=${encodeURIComponent(goal)}&widgets=${widgetIds}&layout=${encodeURIComponent(JSON.stringify(layoutTree))}`;
	}
</script>

<div class="builder-page">
	<div class="builder-header">
		<div class="header-content">
			<a href="/create/generated?goal={encodeURIComponent(goal)}" class="back-link">← Back to Widgets</a>
			<h1>Drag & Drop Builder</h1>
			<div class="goal-info">
				<strong>Goal:</strong> {goal}
				</div>
			</div>
		</div>

		<div class="header-actions">
			<button class="btn btn-secondary" on:click={goToPreview}>Preview</button>
			<button class="btn btn-primary" on:click={saveApp}>Save App</button>
		</div>
	<div class="builder-content">
		<!-- Phone Canvas -->
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

					<div class="app-layout">
						{#if layoutTree.length === 0}
							<div class="layout-placeholder">
								<p>👆 Add rows and drag widgets to build your app layout</p>
								<p class="layout-note">This is a structural preview - use Preview button to see realistic rendering</p>
							</div>
						{:else}
							{#each renderPhonePreview() as row}
								<div class="layout-row">
									{#each row.children as node}
										{#if node.type === 'widget' && node.widget}
											<div
												class="widget-card layout-preview"
												class:full-width={node.widget.width === 2}
												class:tall={node.widget.height === 2}
											>
												<div class="widget-header">
													<span class="widget-icon">{node.widget.icon}</span>
													<span class="widget-name">{node.widget.name}</span>
												</div>
											</div>
										{/if}
									{/each}
								</div>
							{/each}
							<div class="layout-footer">
								<p class="layout-note">📱 Layout structure preview - Click "Preview" for realistic rendering</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- Layout Structure Panel -->
		<div class="layout-panel">
			<div class="panel-header">
				<h3>Layout Structure</h3>
				<button class="add-row-btn" on:click={addRow}>+ Add Row</button>
			</div>

			<div class="layout-tree">
				{#each layoutTree as row, rowIndex}
					<div class="tree-row" class:selected={selectedNodeId === row.id}>
						<div
							class="tree-node row-node"
							role="button"
							tabindex="0"
							on:dragover={handleDragOver}
							on:dragleave={handleDragLeave}
							on:drop={(e) => handleDropOnRow(e, row.id)}
						>
							<span class="node-icon">📋</span>
							<span class="node-label">Row {rowIndex + 1}</span>
							<div class="node-actions">
								<button class="action-btn" title="Delete row">🗑️</button>
							</div>
						</div>

						{#if row.children && row.children.length > 0}
							<div
								class="tree-children"
								role="group"
								on:dragover={handleDragOver}
								on:dragleave={handleDragLeave}
								on:drop={(e) => handleDropOnRow(e, row.id)}
							>
								{#each row.children as child}
									{#if child.type === 'widget' && child.widget}
										<div
											class="tree-node widget-node"
											class:selected={selectedNodeId === child.id}
											role="button"
											tabindex="0"
											draggable="true"
											on:dragstart={(e) => handleDragStart(e, child.widget!, child.id)}
											on:dragend={handleDragEnd}
										>
											<span class="node-icon">{child.widget.icon}</span>
											<div class="node-content">
												<span class="node-label">{child.widget.name}</span>
												<span class="node-meta">{child.widget.width === 2 ? 'Full Width' : 'Half Width'}</span>
											</div>
											<div class="node-actions">
												<button class="action-btn" on:click={() => removeWidget(child.id)} title="Remove widget">✕</button>
											</div>
										</div>
									{/if}
								{/each}
							</div>
						{:else}
							<div
								class="empty-row"
								role="button"
								tabindex="0"
								on:dragover={handleDragOver}
								on:dragleave={handleDragLeave}
								on:drop={(e) => handleDropOnEmptyRow(e, row.id)}
							>
								<span class="empty-text">Drop widgets here</span>
							</div>
						{/if}
					</div>
				{/each}
			</div>

			<div class="available-widgets-section">
				<h4>Available Widgets</h4>
				<div class="available-widgets">
					{#each availableWidgets as widget}
						<div
							class="widget-card draggable"
							role="button"
							tabindex="0"
							draggable="true"
							on:dragstart={(e) => handleDragStart(e, widget)}
							on:dragend={handleDragEnd}
						>
							<div class="widget-header">
								<span class="widget-icon">{widget.icon}</span>
								<span class="widget-name">{widget.name}</span>
							</div>
							<div class="widget-description">{widget.description}</div>
							<div class="widget-meta">
								{widget.width === 2 ? 'Full Width' : 'Half Width'} •
								{widget.height === 2 ? 'Tall' : 'Normal'}
							</div>
						</div>
					{/each}					{#if availableWidgets.length === 0}
						<div class="no-available-widgets">
							<p>All widgets are in use!</p>
							<p>Remove widgets from the layout to place them elsewhere.</p>
						</div>
					{/if}
				</div>
			</div>
		</div>
</div>
</div>