<script lang="ts">
	import { onMount } from 'svelte';
	import '$lib/styles/chat.css';

	let userInput = '';
	let isLoading = false;
	let conversation: Array<{ type: 'user' | 'assistant'; content: string; timestamp: Date }> = [];
	let suggestedInputs = [
		"I'm visiting Tokyo for 7 days. Here is my flight number JL123.",
		'I just had a baby and need to track everything.',
		"I'm starting my freshman year at UC Berkeley.",
		'I have business meetings in Singapore next week.'
	];

	let textareaElement: HTMLTextAreaElement;

	onMount(() => {
		// Add initial assistant message
		conversation = [
			{
				type: 'assistant',
				content:
					"👋 Hi! I'm here to help you create the perfect app for your goals.\n\nJust tell me what you're trying to accomplish, and I'll build you a personalized app with all the widgets you need. The more context you provide, the better I can tailor it for you!",
				timestamp: new Date()
			}
		];
	});

	function autoResize() {
		if (textareaElement) {
			textareaElement.style.height = 'auto';
			textareaElement.style.height = textareaElement.scrollHeight + 'px';
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSubmit();
		}
	}

	function useSuggestion(suggestion: string) {
		userInput = suggestion;
		autoResize();
		textareaElement?.focus();
	}

	async function handleSubmit() {
		if (!userInput.trim() || isLoading) return;

		const userMessage = userInput.trim();
		userInput = '';
		autoResize();

		// Add user message to conversation
		conversation = [
			...conversation,
			{
				type: 'user',
				content: userMessage,
				timestamp: new Date()
			}
		];

		isLoading = true;

		// Simulate AI processing
		setTimeout(() => {
			// Add assistant response
			const response = generateAIResponse(userMessage);
			conversation = [
				...conversation,
				{
					type: 'assistant',
					content: response,
					timestamp: new Date()
				}
			];
			isLoading = false;

			// After AI responds, navigate to generated app
			setTimeout(() => {
				window.location.href = `/create/generated?goal=${encodeURIComponent(userMessage)}`;
			}, 2000);
		}, 1500);
	}

	function generateAIResponse(input: string): string {
		const lowerInput = input.toLowerCase();

		if (lowerInput.includes('tokyo') || lowerInput.includes('japan')) {
			return "Perfect! I can see you're planning a trip to Tokyo. Let me create a comprehensive travel companion app for you.\n\n🎯 **Analyzing your needs:**\n- Flight tracking and airport information\n- Tokyo weather and local conditions\n- Currency converter (JPY/USD)\n- Tokyo transit and subway maps\n- Local events and restaurant recommendations\n- Real-time translation tools\n- Emergency contacts and embassy info\n\n✨ **Creating your personalized Tokyo Travel app...**";
		} else if (lowerInput.includes('baby') || lowerInput.includes('newborn')) {
			return "Congratulations on your new arrival! 👶 I'll create a comprehensive baby tracking app to help you through this exciting time.\n\n🎯 **Analyzing your needs:**\n- Feeding and diaper tracking\n- Sleep pattern monitoring\n- Growth and milestone tracker\n- Pediatrician finder and appointment scheduler\n- Baby-friendly store locator\n- Vaccination reminder system\n- Photo timeline for memories\n\n✨ **Creating your personalized Baby Care app...**";
		} else if (
			lowerInput.includes('college') ||
			lowerInput.includes('berkeley') ||
			lowerInput.includes('freshman')
		) {
			return 'Exciting! Starting college is a big step. 🎓 Let me create a student life app tailored for UC Berkeley.\n\n🎯 **Analyzing your needs:**\n- Class schedule and campus map\n- Dining hall hours and menus\n- Study group finder\n- Campus event calendar\n- Berkeley weather updates\n- Library hours and availability\n- Student services directory\n\n✨ **Creating your personalized Berkeley Student app...**';
		} else if (
			lowerInput.includes('business') ||
			lowerInput.includes('singapore') ||
			lowerInput.includes('meeting')
		) {
			return "Great! Business travel requires careful coordination. 💼 I'll create a professional travel companion for your Singapore meetings.\n\n🎯 **Analyzing your needs:**\n- Flight and meeting schedule sync\n- Singapore business hours and etiquette\n- Currency converter (SGD)\n- Local weather and dress code advice\n- Business district maps and transport\n- Restaurant recommendations for client dinners\n- Time zone coordination tools\n\n✨ **Creating your personalized Business Travel app...**";
		} else {
			return `Got it! I understand you want to ${input}. Let me analyze your goals and create the perfect app companion for you.\n\n🎯 **Analyzing your needs...**\n\nI'm identifying the most relevant widgets and capabilities from our MCP registry to match your specific situation.\n\n✨ **Creating your personalized app...**`;
		}
	}

	function formatTimestamp(date: Date): string {
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}
</script>

<div class="chat-page">
	<div class="chat-header">
		<h1>🧠 Tell Mosaic Your Goal</h1>
		<p>Describe what you're trying to accomplish, and I'll build you the perfect app</p>
	</div>

	<div class="chat-container">
		<div class="conversation">
			{#each conversation as message}
				<div class="message {message.type}">
					<div class="message-content">
						<div class="message-text">
							{@html message.content.replace(/\n/g, '<br>')}
						</div>
						<div class="message-time">
							{formatTimestamp(message.timestamp)}
						</div>
					</div>
				</div>
			{/each}

			{#if isLoading}
				<div class="message assistant">
					<div class="message-content">
						<div class="typing-indicator">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
				</div>
			{/if}
		</div>

		{#if conversation.length <= 1}
			<div class="suggestions">
				<h3>💡 Try these examples:</h3>
				<div class="suggestion-grid">
					{#each suggestedInputs as suggestion}
						<button class="suggestion-card" on:click={() => useSuggestion(suggestion)}>
							{suggestion}
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<div class="input-area">
			<div class="input-container">
				<textarea
					bind:this={textareaElement}
					bind:value={userInput}
					placeholder="Describe your goal... (e.g., 'I'm visiting Tokyo for 7 days')"
					on:input={autoResize}
					on:keydown={handleKeyDown}
					disabled={isLoading}
					rows="1"
				></textarea>
				<button
					class="send-button"
					on:click={handleSubmit}
					disabled={!userInput.trim() || isLoading}
				>
					{#if isLoading}
						<div class="spinner"></div>
					{:else}
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="currentColor" />
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>
