import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// MCP Servers Registry
export const mcpServers = sqliteTable('mcp_servers', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	url: text('url').notNull().unique(),
	status: text('status').notNull().default('pending'), // 'active', 'pending', 'inactive'
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

// Widget definitions provided by MCP servers
export const widgets = sqliteTable('widgets', {
	id: integer('id').primaryKey(),
	mcpServerId: integer('mcp_server_id').notNull().references(() => mcpServers.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	description: text('description'),
	category: text('category'), // 'weather', 'calendar', 'finance', etc.
	componentUrl: text('component_url').notNull(), // URL to the web component
	configSchema: text('config_schema'), // JSON schema for widget configuration
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

// User-created apps
export const apps = sqliteTable('apps', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	templateId: text('template_id').notNull(), // 'three-row', 'two-column-plus', etc.
	status: text('status').notNull().default('draft'), // 'draft', 'published'
	shareToken: text('share_token').unique(), // For sharing published apps
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

// Widget instances in apps
export const appWidgets = sqliteTable('app_widgets', {
	id: integer('id').primaryKey(),
	appId: integer('app_id').notNull().references(() => apps.id, { onDelete: 'cascade' }),
	widgetId: integer('widget_id').notNull().references(() => widgets.id),
	position: integer('position').notNull(), // 0, 1, 2 for widget order
	config: text('config'), // JSON configuration for this widget instance
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

// Legacy user table (keeping for compatibility)
export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	age: integer('age')
});
