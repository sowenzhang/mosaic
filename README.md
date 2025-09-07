# Mosaic - MCP-Powered PWA Builder

A template-based no-code builder for creating Progressive Web Apps (PWAs) using Model Context Protocol (MCP) servers as widget sources.

## 🎯 Project Overview

Mosaic is a hackathon project that enables users to build custom PWAs by composing widgets from various MCP servers. Think of it like an Android phone's home screen where you can add widgets, but for web applications.

### Key Features

- **Template-Based Builder**: Start with 2-3 pre-built templates
- **MCP Registry**: Central registry for discovering and managing MCP servers
- **Drag & Drop Interface**: Intuitive widget arrangement and ordering
- **Web Component Architecture**: Each MCP server provides a rendering API for web components
- **PWA Publishing**: Export as a fully functional Progressive Web App
- **Shareable Apps**: Published apps can be shared with others

### Example Use Case: "Travel Pal" App

Users can create a personalized travel companion app by combining:

- Weather widget (from weather MCP server)
- Calendar widget (from calendar MCP server)
- Currency exchange widget (from finance MCP server)

The final result is a cohesive PWA that loads and orchestrates multiple MCP-powered widgets.

## 🏗️ Architecture

1. **Frontend**: Svelte-based builder interface with drag-and-drop functionality
2. **MCP Registry**: Database of registered MCP servers and their capabilities
3. **Widget System**: Web components rendered from MCP server APIs
4. **PWA Generator**: Builds deployable Progressive Web Apps
5. **Publishing Platform**: Hosts and shares completed applications

## 🚀 Getting Started

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
