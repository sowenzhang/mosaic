import { db } from './index.js';
import { mcpServers, widgets } from './schema.js';

export async function seedDatabase() {
	console.log('🌱 Seeding database...');

	// Clear existing data
	await db.delete(widgets);
	await db.delete(mcpServers);

	// Insert sample MCP servers
	const servers = await db.insert(mcpServers).values([
		{
			name: 'Weather Service',
			description: 'Provides weather widgets with current conditions and forecasts',
			url: 'https://weather-mcp.example.com',
			status: 'active',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'Calendar Service',
			description: 'Calendar and scheduling widgets for productivity',
			url: 'https://calendar-mcp.example.com',
			status: 'active',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'Currency Exchange',
			description: 'Real-time currency exchange rates and conversion tools',
			url: 'https://currency-mcp.example.com',
			status: 'active',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'News Service',
			description: 'Latest news and headlines from various sources',
			url: 'https://news-mcp.example.com',
			status: 'active',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			name: 'Task Manager',
			description: 'Todo lists and task management widgets',
			url: 'https://tasks-mcp.example.com',
			status: 'pending',
			createdAt: new Date(),
			updatedAt: new Date()
		}
	]).returning();

	// Insert sample widgets for each server
	const weatherServer = servers.find(s => s.name === 'Weather Service');
	const calendarServer = servers.find(s => s.name === 'Calendar Service');
	const currencyServer = servers.find(s => s.name === 'Currency Exchange');
	const newsServer = servers.find(s => s.name === 'News Service');
	const taskServer = servers.find(s => s.name === 'Task Manager');

	if (!weatherServer || !calendarServer || !currencyServer || !newsServer || !taskServer) {
		throw new Error('Failed to create all required servers');
	}

	await db.insert(widgets).values([
		// Weather widgets
		{
			mcpServerId: weatherServer.id,
			name: 'Current Weather',
			description: 'Shows current weather conditions for a location',
			category: 'weather',
			componentUrl: 'https://weather-mcp.example.com/widgets/current',
			configSchema: JSON.stringify({
				type: 'object',
				properties: {
					location: { type: 'string', title: 'Location' },
					units: { type: 'string', enum: ['metric', 'imperial'], title: 'Units' }
				}
			}),
			createdAt: new Date()
		},
		{
			mcpServerId: weatherServer.id,
			name: 'Weather Forecast',
			description: '5-day weather forecast',
			category: 'weather',
			componentUrl: 'https://weather-mcp.example.com/widgets/forecast',
			configSchema: JSON.stringify({
				type: 'object',
				properties: {
					location: { type: 'string', title: 'Location' },
					days: { type: 'number', minimum: 1, maximum: 7, title: 'Number of days' }
				}
			}),
			createdAt: new Date()
		},

		// Calendar widgets
		{
			mcpServerId: calendarServer.id,
			name: 'Daily Calendar',
			description: 'Shows today\'s events and schedule',
			category: 'calendar',
			componentUrl: 'https://calendar-mcp.example.com/widgets/daily',
			configSchema: JSON.stringify({
				type: 'object',
				properties: {
					calendarId: { type: 'string', title: 'Calendar ID' },
					showTime: { type: 'boolean', title: 'Show Time' }
				}
			}),
			createdAt: new Date()
		},
		{
			mcpServerId: calendarServer.id,
			name: 'Month View',
			description: 'Monthly calendar overview',
			category: 'calendar',
			componentUrl: 'https://calendar-mcp.example.com/widgets/month',
			configSchema: JSON.stringify({
				type: 'object',
				properties: {
					calendarId: { type: 'string', title: 'Calendar ID' }
				}
			}),
			createdAt: new Date()
		},

		// Currency widgets
		{
			mcpServerId: currencyServer.id,
			name: 'Exchange Rates',
			description: 'Live currency exchange rates',
			category: 'finance',
			componentUrl: 'https://currency-mcp.example.com/widgets/rates',
			configSchema: JSON.stringify({
				type: 'object',
				properties: {
					baseCurrency: { type: 'string', title: 'Base Currency', default: 'USD' },
					targetCurrencies: { type: 'array', items: { type: 'string' }, title: 'Target Currencies' }
				}
			}),
			createdAt: new Date()
		},
		{
			mcpServerId: currencyServer.id,
			name: 'Currency Converter',
			description: 'Convert between different currencies',
			category: 'finance',
			componentUrl: 'https://currency-mcp.example.com/widgets/converter',
			configSchema: JSON.stringify({
				type: 'object',
				properties: {
					defaultFrom: { type: 'string', title: 'Default From Currency' },
					defaultTo: { type: 'string', title: 'Default To Currency' }
				}
			}),
			createdAt: new Date()
		},

		// News widgets
		{
			mcpServerId: newsServer.id,
			name: 'News Headlines',
			description: 'Latest news headlines',
			category: 'news',
			componentUrl: 'https://news-mcp.example.com/widgets/headlines',
			configSchema: JSON.stringify({
				type: 'object',
				properties: {
					category: { type: 'string', enum: ['general', 'business', 'technology', 'sports'], title: 'Category' },
					count: { type: 'number', minimum: 1, maximum: 10, title: 'Number of articles' }
				}
			}),
			createdAt: new Date()
		},

		// Task widgets (pending server)
		{
			mcpServerId: taskServer.id,
			name: 'Task List',
			description: 'Simple todo list widget',
			category: 'productivity',
			componentUrl: 'https://tasks-mcp.example.com/widgets/list',
			configSchema: JSON.stringify({
				type: 'object',
				properties: {
					listId: { type: 'string', title: 'List ID' },
					showCompleted: { type: 'boolean', title: 'Show Completed Tasks' }
				}
			}),
			createdAt: new Date()
		}
	]);

	console.log('✅ Database seeded successfully!');
	console.log(`- Created ${servers.length} MCP servers`);
	console.log(`- Created ${await db.select().from(widgets).then(w => w.length)} widgets`);
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
	await seedDatabase();
	process.exit(0);
}
