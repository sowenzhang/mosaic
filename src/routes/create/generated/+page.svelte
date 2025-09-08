<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import '$lib/styles/generated.css';

	let goal = '';
	let generatedWidgets: any[] = [];
	let isGenerating = true;

	onMount(() => {
		goal = $page.url.searchParams.get('goal') || '';

		// Simulate AI generation
		setTimeout(() => {
			generatedWidgets = generateWidgetsForGoal(goal);
			isGenerating = false;
		}, 2000);
	});

	function generateWidgetsForGoal(goalText: string): any[] {
		const lowerGoal = goalText.toLowerCase();

		if (lowerGoal.includes('tokyo') || lowerGoal.includes('japan')) {
			return [
				{ id: 1, name: 'Flight Tracker', icon: '✈️', category: 'travel', description: 'Track your flight JL123 and airport updates' },
				{ id: 2, name: 'Tokyo Weather', icon: '🌤️', category: 'weather', description: 'Local weather and conditions' },
				{ id: 3, name: 'Currency Converter', icon: '💱', category: 'finance', description: 'JPY/USD live exchange rates' },
				{ id: 4, name: 'Tokyo Transit', icon: '🚇', category: 'transport', description: 'Subway maps and route planning' },
				{ id: 5, name: 'Local Events', icon: '🎌', category: 'entertainment', description: 'Festivals and attractions near you' },
				{ id: 6, name: 'Translator', icon: '🗣️', category: 'utility', description: 'Real-time Japanese translation' }
			];
		} else if (lowerGoal.includes('baby') || lowerGoal.includes('newborn')) {
			return [
				{ id: 1, name: 'Feeding Tracker', icon: '🍼', category: 'health', description: 'Log feeding times and amounts' },
				{ id: 2, name: 'Sleep Monitor', icon: '😴', category: 'health', description: 'Track sleep patterns' },
				{ id: 3, name: 'Growth Chart', icon: '📏', category: 'health', description: 'Monitor weight and height' },
				{ id: 4, name: 'Pediatrician Finder', icon: '👩‍⚕️', category: 'health', description: 'Find nearby baby doctors' },
				{ id: 5, name: 'Milestone Tracker', icon: '🎯', category: 'development', description: 'Track developmental milestones' },
				{ id: 6, name: 'Baby Store Locator', icon: '🏪', category: 'shopping', description: 'Find baby supplies nearby' }
			];
		} else if (lowerGoal.includes('college') || lowerGoal.includes('berkeley')) {
			return [
				{ id: 1, name: 'Class Schedule', icon: '📚', category: 'education', description: 'Your UC Berkeley course schedule' },
				{ id: 2, name: 'Campus Map', icon: '🗺️', category: 'navigation', description: 'Interactive Berkeley campus map' },
				{ id: 3, name: 'Dining Halls', icon: '🍽️', category: 'food', description: 'Hours and menus for campus dining' },
				{ id: 4, name: 'Study Groups', icon: '👥', category: 'social', description: 'Find and join study groups' },
				{ id: 5, name: 'Campus Events', icon: '🎉', category: 'events', description: 'Clubs, activities, and social events' },
				{ id: 6, name: 'Library Hours', icon: '📖', category: 'education', description: 'Library availability and resources' }
			];
		} else {
			return [
				{ id: 1, name: 'Goal Tracker', icon: '🎯', category: 'productivity', description: 'Track your progress' },
				{ id: 2, name: 'Weather Widget', icon: '🌤️', category: 'weather', description: 'Local weather conditions' },
				{ id: 3, name: 'Calendar', icon: '📅', category: 'productivity', description: 'Your schedule and events' },
				{ id: 4, name: 'News Feed', icon: '📰', category: 'news', description: 'Relevant news updates' }
			];
		}
	}

	function proceedToBuilder() {
		const widgetIds = generatedWidgets.map(w => w.id).join(',');
		window.location.href = `/create/builder?widgets=${widgetIds}&goal=${encodeURIComponent(goal)}`;
	}
</script>

<div class="generated-page">
	<div class="page-header">
		<h1>🎉 Your Personalized App</h1>
		<div class="goal-display">
			<strong>Goal:</strong> {goal}
		</div>
	</div>

	{#if isGenerating}
		<div class="generating">
			<div class="loading-animation">
				<div class="spinner-large"></div>
				<h2>🧠 Analyzing your needs...</h2>
				<p>Finding the perfect widgets from our MCP registry</p>
				<div class="progress-steps">
					<div class="step active">🔍 Analyzing goal</div>
					<div class="step active">🔌 Finding MCP servers</div>
					<div class="step active">🧩 Selecting widgets</div>
					<div class="step">📱 Creating your app</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="app-preview">
			<div class="widget-showcase">
				<h2>✨ I've selected these widgets for you:</h2>
				<div class="widget-grid">
					{#each generatedWidgets as widget}
						<div class="widget-card">
							<div class="widget-icon">{widget.icon}</div>
							<h3>{widget.name}</h3>
							<p>{widget.description}</p>
							<span class="widget-category">{widget.category}</span>
						</div>
					{/each}
				</div>

				<div class="widget-summary">
					<h3>Your app will include all {generatedWidgets.length} widgets</h3>
					<p>Next, you'll be able to arrange them exactly how you want with our drag-and-drop builder.</p>
				</div>

				<button class="btn btn-primary" on:click={proceedToBuilder}>
					🚀 Design Your Layout
				</button>
			</div>
		</div>
	{/if}
</div>
