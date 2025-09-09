<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import '$lib/styles/preview.css';

	interface Widget {
		id: number;
		name: string;
		description: string;
		category: string;
		serverName: string;
		icon: string;
		height: number;
		width: number;
	}

	interface LayoutNode {
		id: string;
		type: 'row' | 'column' | 'widget';
		widget?: Widget;
		children?: LayoutNode[];
		width?: number;
	}

	let goal = '';
	let layoutTree: LayoutNode[] = [];
	let currentTime = new Date();

	// Mock widget data
	const allMockWidgets: Record<number, Widget> = {
		1: { id: 1, name: 'Flight Tracker', icon: '✈️', category: 'travel', description: 'Track your flight JL123 and airport updates', serverName: 'Flight Service', height: 1, width: 2 },
		2: { id: 2, name: 'Tokyo Weather', icon: '🌤️', category: 'weather', description: 'Local weather and conditions', serverName: 'Weather Service', height: 1, width: 1 },
		3: { id: 3, name: 'Currency Converter', icon: '💱', category: 'finance', description: 'JPY/USD live exchange rates', serverName: 'Currency Service', height: 1, width: 1 },
		4: { id: 4, name: 'Tokyo Transit', icon: '🚇', category: 'transport', description: 'Subway maps and route planning', serverName: 'Transit Service', height: 2, width: 1 },
		5: { id: 5, name: 'Local Events', icon: '🎌', category: 'entertainment', description: 'Festivals and attractions near you', serverName: 'Events Service', height: 1, width: 1 },
		6: { id: 6, name: 'Translator', icon: '🗣️', category: 'utility', description: 'Real-time Japanese translation', serverName: 'Translation Service', height: 1, width: 2 }
	};

	// Mock data for realistic rendering
	const mockData = {
		flight: {
			number: 'JL123',
			status: 'On Time',
			departure: '14:30',
			arrival: '16:45',
			gate: 'A12',
			recommendedArrival: '12:30'
		},
		weather: {
			current: { temp: 24, condition: '☀️', desc: 'Sunny' },
			forecast: [
				{ day: 'Today', temp: '24°', icon: '☀️' },
				{ day: 'Tomorrow', temp: '22°', icon: '🌧️' },
				{ day: 'Wed', temp: '26°', icon: '⛅' },
				{ day: 'Thu', temp: '28°', icon: '☀️' }
			]
		},
		currency: {
			rate: 149.50,
			change: '+1.2%',
			updated: '2 min ago'
		},
		transit: {
			nearbyStations: [
				{ name: 'Shibuya', line: 'JR Yamanote', time: '2 min' },
				{ name: 'Harajuku', line: 'JR Yamanote', time: '5 min' },
				{ name: 'Shinjuku', line: 'JR Yamanote', time: '7 min' }
			]
		},
		events: {
			count: 12,
			featured: {
				name: 'Cherry Blossom Festival',
				location: 'Ueno Park',
				time: 'Today 10:00 AM'
			}
		}
	};

	onMount(() => {
		goal = $page.url.searchParams.get('goal') || '';
		const layoutParam = $page.url.searchParams.get('layout');

		if (layoutParam) {
			try {
				layoutTree = JSON.parse(decodeURIComponent(layoutParam));
			} catch (e) {
				console.error('Failed to parse layout:', e);
			}
		}

		// Update time every minute
		const interval = setInterval(() => {
			currentTime = new Date();
		}, 60000);

		return () => clearInterval(interval);
	});

	function renderRealisticWidget(widget: Widget) {
		switch (widget.id) {
			case 1: // Flight Tracker
				return `
					<div class="flight-widget">
						<div class="flight-header">
							<span class="flight-icon">✈️</span>
							<div class="flight-info">
								<div class="flight-number">${mockData.flight.number}</div>
								<div class="flight-status status-${mockData.flight.status.toLowerCase().replace(' ', '-')}">${mockData.flight.status}</div>
							</div>
						</div>
						<div class="flight-times">
							<div class="time-block">
								<div class="time">${mockData.flight.departure}</div>
								<div class="label">Departure</div>
							</div>
							<div class="flight-arrow">→</div>
							<div class="time-block">
								<div class="time">${mockData.flight.arrival}</div>
								<div class="label">Arrival</div>
							</div>
						</div>
						<div class="flight-details">
							<span>Gate ${mockData.flight.gate}</span>
							<span>Arrive by ${mockData.flight.recommendedArrival}</span>
						</div>
					</div>
				`;

			case 2: // Weather
				return `
					<div class="weather-widget ${widget.width === 2 ? 'full' : 'compact'}">
						<div class="weather-current">
							<div class="weather-icon">${mockData.weather.current.condition}</div>
							<div class="weather-info">
								<div class="weather-temp">${mockData.weather.current.temp}°</div>
								<div class="weather-desc">${mockData.weather.current.desc}</div>
							</div>
						</div>
						<div class="weather-forecast">
							${mockData.weather.forecast.slice(1).map(day => `
								<div class="forecast-day">
									<div class="day">${day.day}</div>
									<div class="icon">${day.icon}</div>
									<div class="temp">${day.temp}</div>
								</div>
							`).join('')}
						</div>
					</div>
				`;

			case 3: // Currency Converter
				return `
					<div class="currency-widget">
						<div class="currency-pair">
							<span class="from">USD</span>
							<span class="arrow">→</span>
							<span class="to">JPY</span>
						</div>
						<div class="exchange-rate">
							<div class="rate">¥${mockData.currency.rate}</div>
							<div class="change positive">${mockData.currency.change}</div>
						</div>
						<div class="last-updated">${mockData.currency.updated}</div>
					</div>
				`;

			case 4: // Transit
				return `
					<div class="transit-widget">
						<div class="transit-header">
							<span class="transit-icon">🚇</span>
							<span class="transit-title">Nearby Stations</span>
						</div>
						<div class="stations-list">
							${mockData.transit.nearbyStations.map(station => `
								<div class="station-item">
									<div class="station-info">
										<div class="station-name">${station.name}</div>
										<div class="station-line">${station.line}</div>
									</div>
									<div class="station-time">${station.time}</div>
								</div>
							`).join('')}
						</div>
					</div>
				`;

			case 5: // Local Events
				return `
					<div class="events-widget ${widget.width === 2 ? 'full' : 'compact'}">
						${widget.width === 1 ? `
							<div class="events-count">
								<div class="count-number">${mockData.events.count}</div>
								<div class="count-label">Events Today</div>
							</div>
						` : `
							<div class="events-header">
								<span class="events-icon">🎌</span>
								<span class="events-title">Local Events</span>
								<span class="events-count">${mockData.events.count}</span>
							</div>
							<div class="featured-event">
								<div class="event-name">${mockData.events.featured.name}</div>
								<div class="event-location">${mockData.events.featured.location}</div>
								<div class="event-time">${mockData.events.featured.time}</div>
							</div>
						`}
					</div>
				`;

			case 6: // Translator
				return `
					<div class="translator-widget">
						<div class="translator-header">
							<span class="translator-icon">🗣️</span>
							<span class="translator-title">Live Translator</span>
						</div>
						<div class="translator-controls">
							<button class="translator-btn listen">
								<span class="btn-icon">🎤</span>
								<span class="btn-label">Speak</span>
							</button>
							<button class="translator-btn output">
								<span class="btn-icon">👂</span>
								<span class="btn-label">Listen</span>
							</button>
						</div>
						<div class="translator-status">EN ⟷ JP Ready</div>
					</div>
				`;

			default:
				return `
					<div class="default-widget">
						<div class="widget-icon">${widget.icon}</div>
						<div class="widget-name">${widget.name}</div>
					</div>
				`;
		}
	}

	function goBackToBuilder() {
		const widgetIds = layoutTree
			.flatMap(row => row.children || [])
			.map(child => child.widget?.id)
			.filter(Boolean)
			.join(',');

		window.location.href = `/create/builder?goal=${encodeURIComponent(goal)}&widgets=${widgetIds}`;
	}
</script>

<div class="preview-page">
	<div class="preview-header">
		<div class="header-content">
			<button class="back-btn" on:click={goBackToBuilder}>← Back to Builder</button>
			<h1>App Preview</h1>
			<div class="goal-info">
				<strong>Goal:</strong> {goal}
			</div>
		</div>
		<div class="header-actions">
			<button class="btn btn-primary">Export App</button>
		</div>
	</div>

	<div class="preview-content">
		<div class="phone-preview">
			<div class="phone-frame">
				<div class="phone-screen">
					<div class="phone-header">
						<div class="status-bar">
							<span class="time">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
							<div class="status-icons">
								<span>📶</span>
								<span>🔋</span>
							</div>
						</div>
					</div>

					<div class="app-content">
						{#each layoutTree as row}
							<div class="content-row">
								{#each row.children || [] as node}
									{#if node.type === 'widget' && node.widget}
										<div
											class="realistic-widget"
											class:full-width={node.widget.width === 2}
											class:tall={node.widget.height === 2}
										>
											{@html renderRealisticWidget(node.widget)}
										</div>
									{/if}
								{/each}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="preview-info">
			<h3>Realistic App Preview</h3>
			<p>This shows how your app would look with real data and interactions. The widgets display actual information and styling as they would appear to users.</p>

			<div class="widget-features">
				<h4>Widget Features:</h4>
				<ul>
					<li><strong>Flight Tracker:</strong> Real-time flight status, gates, and timing</li>
					<li><strong>Weather:</strong> Current conditions and 3-day forecast with icons</li>
					<li><strong>Currency:</strong> Live exchange rates with change indicators</li>
					<li><strong>Transit:</strong> Nearby stations with real-time arrival info</li>
					<li><strong>Events:</strong> Local event counts and featured events</li>
					<li><strong>Translator:</strong> Interactive speak/listen controls</li>
				</ul>
			</div>

			<div class="preview-actions">
				<button class="btn btn-secondary" on:click={goBackToBuilder}>Edit Layout</button>
				<button class="btn btn-primary">Deploy App</button>
			</div>
		</div>
	</div>
</div>
