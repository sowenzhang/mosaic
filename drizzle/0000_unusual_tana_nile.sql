CREATE TABLE `app_widgets` (
	`id` integer PRIMARY KEY NOT NULL,
	`app_id` integer NOT NULL,
	`widget_id` integer NOT NULL,
	`position` integer NOT NULL,
	`config` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`app_id`) REFERENCES `apps`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`widget_id`) REFERENCES `widgets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `apps` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`template_id` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`share_token` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `apps_share_token_unique` ON `apps` (`share_token`);--> statement-breakpoint
CREATE TABLE `mcp_servers` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`url` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `mcp_servers_url_unique` ON `mcp_servers` (`url`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY NOT NULL,
	`age` integer
);
--> statement-breakpoint
CREATE TABLE `widgets` (
	`id` integer PRIMARY KEY NOT NULL,
	`mcp_server_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`category` text,
	`component_url` text NOT NULL,
	`config_schema` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`mcp_server_id`) REFERENCES `mcp_servers`(`id`) ON UPDATE no action ON DELETE cascade
);
