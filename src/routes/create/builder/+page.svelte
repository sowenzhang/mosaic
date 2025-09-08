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

	interface LayoutWidget extends Widget {
		row: number;
		column: number; // 0 or 1 (left or right), or 0 for full width
	}

	let goal = '';
	let availableWidgets: Widget[] = [];
	let layoutWidgets: LayoutWidget[] = [];
	let draggedWidget: Widget | null = null;
	let draggedLayoutWidget: LayoutWidget | null = null;

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

		// Initialize layout with ALL widgets arranged properly
		layoutWidgets = widgets.map((widget, index) => {
			const row = Math.floor(index / 2);
			const column = index % 2;
			return {
				...widget,
				row,
				column
			};
		});

		// No available widgets initially - all are placed
		availableWidgets = [];
	});

	function getMaxRows(): number {
		return Math.max(3, Math.ceil((layoutWidgets.length + availableWidgets.length) / 2));
	}

	function canDropAt(row: number, column: number, height: number, width: number): boolean {
		// For full-width widgets, check the entire row
		if (width === 2) {
			for (let r = row; r < row + height; r++) {
				const existing = layoutWidgets.find(w => w.row <= r && w.row + w.height > r);
				if (existing) return false;
			}
		} else {
			// For half-width widgets, check specific column
			for (let r = row; r < row + height; r++) {
				const existing = layoutWidgets.find(w =>
					w.row <= r && w.row + w.height > r &&
					((w.width === 2) || (w.width === 1 && w.column === column))
				);
				if (existing) return false;
			}
		}
		return true;
	}

	function handleDragStart(event: DragEvent, widget: Widget | LayoutWidget) {
		if ('row' in widget) {
			draggedLayoutWidget = widget;
			draggedWidget = null;
		} else {
			draggedWidget = widget;
			draggedLayoutWidget = null;
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function handleDrop(event: DragEvent, targetRow: number, targetColumn: number) {
		event.preventDefault();

		if (draggedWidget) {
			// Dropping from available widgets
			if (canDropAt(targetRow, targetColumn, draggedWidget.height, draggedWidget.width)) {
				const newColumn = draggedWidget.width === 2 ? 0 : targetColumn;
				layoutWidgets = [...layoutWidgets, {
					...draggedWidget,
					row: targetRow,
					column: newColumn
				}];
				availableWidgets = availableWidgets.filter(w => w.id !== draggedWidget!.id);
			}
		} else if (draggedLayoutWidget) {
			// Moving existing widget
			if (canDropAt(targetRow, targetColumn, draggedLayoutWidget.height, draggedLayoutWidget.width)) {
				const newColumn = draggedLayoutWidget.width === 2 ? 0 : targetColumn;
				layoutWidgets = layoutWidgets.map(w =>
					w.id === draggedLayoutWidget!.id
						? { ...w, row: targetRow, column: newColumn }
						: w
				);
			}
		}

		draggedWidget = null;
		draggedLayoutWidget = null;
	}

	function removeWidget(widget: LayoutWidget) {
		layoutWidgets = layoutWidgets.filter(w => w.id !== widget.id);
		availableWidgets = [...availableWidgets, {
			id: widget.id,
			name: widget.name,
			description: widget.description,
			category: widget.category,
			serverName: widget.serverName,
			icon: widget.icon,
			height: widget.height,
			width: widget.width
		}];
	}

	function toggleWidgetHeight(widget: LayoutWidget) {
		const newHeight = widget.height === 1 ? 2 : 1;
		if (canDropAt(widget.row, widget.column, newHeight, widget.width)) {
			layoutWidgets = layoutWidgets.map(w =>
				w.id === widget.id ? { ...w, height: newHeight } : w
			);
		}
	}

	function toggleWidgetWidth(widget: LayoutWidget) {
		const newWidth = widget.width === 1 ? 2 : 1;
		const newColumn = newWidth === 2 ? 0 : widget.column;
		if (canDropAt(widget.row, newColumn, widget.height, newWidth)) {
			layoutWidgets = layoutWidgets.map(w =>
				w.id === widget.id ? { ...w, width: newWidth, column: newColumn } : w
			);
		}
	}

	function saveApp() {
		console.log('Saving app layout:', layoutWidgets);
		alert('App layout saved successfully! (This is a demo)');
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
			<button class="btn btn-secondary">Preview</button>
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
						{#each Array(getMaxRows()) as _, rowIndex}
							{@const fullWidthWidget = layoutWidgets.find(w => w.row === rowIndex && w.width === 2)}
							<div class="layout-row">
								{#if fullWidthWidget}
									<!-- Full width widget -->
									<div
										class="widget-slot filled full-width"
										class:tall={fullWidthWidget.height === 2}
										draggable="true"
										role="button"
										tabindex="0"
										on:dragstart={(e) => handleDragStart(e, fullWidthWidget)}
									>
										<div class="placed-widget">
											<div class="widget-header">
												<span class="widget-icon">{fullWidthWidget.icon}</span>
												<span class="widget-name">{fullWidthWidget.name}</span>
												<div class="widget-controls">
													<button
														class="control-btn"
														on:click={() => toggleWidgetWidth(fullWidthWidget)}
														title="Toggle width"
													>
														{fullWidthWidget.width === 1 ? '⬌' : '⬍'}
													</button>
													<button
														class="control-btn"
														on:click={() => toggleWidgetHeight(fullWidthWidget)}
														title="Toggle height"
													>
														{fullWidthWidget.height === 1 ? '⬆️' : '⬇️'}
													</button>
													<button
														class="remove-widget control-btn"
														on:click={() => removeWidget(fullWidthWidget)}
													>×</button>
												</div>
											</div>
											<div class="widget-preview">Preview: {fullWidthWidget.name}</div>
										</div>
									</div>
								{:else}
									<!-- Half width widgets -->
									{#each [0, 1] as columnIndex}
										{@const existingWidget = layoutWidgets.find(w => w.row === rowIndex && w.column === columnIndex && w.width === 1)}
										{#if existingWidget}
											<div
												class="widget-slot filled"
												class:tall={existingWidget.height === 2}
												draggable="true"
												role="button"
												tabindex="0"
												on:dragstart={(e) => handleDragStart(e, existingWidget)}
											>
												<div class="placed-widget">
													<div class="widget-header">
														<span class="widget-icon">{existingWidget.icon}</span>
														<span class="widget-name">{existingWidget.name}</span>
														<div class="widget-controls">
															<button
																class="control-btn"
																on:click={() => toggleWidgetWidth(existingWidget)}
																title="Toggle width"
															>
																{existingWidget.width === 1 ? '⬌' : '⬍'}
															</button>
															<button
																class="control-btn"
																on:click={() => toggleWidgetHeight(existingWidget)}
																title="Toggle height"
															>
																{existingWidget.height === 1 ? '⬆️' : '⬇️'}
															</button>
															<button
																class="remove-widget control-btn"
																on:click={() => removeWidget(existingWidget)}
															>×</button>
														</div>
													</div>
													<div class="widget-preview">Preview: {existingWidget.name}</div>
												</div>
											</div>
										{:else}
											{@const canDrop = !layoutWidgets.some(w =>
												w.row < rowIndex + 1 && w.row + w.height > rowIndex &&
												(w.width === 2 || (w.width === 1 && w.column === columnIndex))
											)}
											{#if canDrop}
												<div
													class="widget-slot empty"
													role="button"
													tabindex="0"
													on:dragover={handleDragOver}
													on:drop={(e) => handleDrop(e, rowIndex, columnIndex)}
												>
													<div class="drop-zone">
														<span class="plus-icon">+</span>
														<span>Drop Widget</span>
													</div>
												</div>
											{/if}
										{/if}
									{/each}
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Available Widgets Panel -->
		<div class="widgets-panel">
			<h3>Widget Library</h3>
			<div class="available-widgets">
				{#if availableWidgets.length > 0}
					{#each availableWidgets as widget}
						<div
							class="widget-item"
							draggable="true"
							role="button"
							tabindex="0"
							on:dragstart={(e) => handleDragStart(e, widget)}
						>
							<div class="widget-item-icon">{widget.icon}</div>
							<div class="widget-item-info">
								<div class="widget-item-name">{widget.name}</div>
								<div class="widget-item-description">{widget.description}</div>
								<div class="widget-item-meta">
									{widget.width === 2 ? 'Full Width' : 'Half Width'} •
									{widget.height === 2 ? 'Tall' : 'Normal'}
								</div>
							</div>
						</div>
					{/each}
				{:else}
					<div class="all-widgets-placed">
						<p>📱 All widgets are placed in the app!</p>
						<p>You can:</p>
						<ul>
							<li>Drag widgets within the phone to rearrange</li>
							<li>Use resize buttons (⬌ ⬆️) to change size</li>
							<li>Remove widgets (×) to place them differently</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
</div>
</div>