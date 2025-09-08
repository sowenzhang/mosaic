# Mosaic - Intelligent PWA Companion

> *"Tell us the goal, we'll build the app."*

Mosaic creates living, evolving Progressive Web Apps that adapt to your context and goals using Model Context Protocol (MCP) capabilities.

## 🎯 The Problem We Solve

Most people don't know what features they need until it's too late. Traditional app builders give you a blank canvas and ask "what do you want?" Mosaic flips this: **tell us what you're trying to accomplish, and we'll give you the app you need**.

## 🌟 What Makes Mosaic Different

**Compared to GitHub Spark or Google AI Studio:**

- **They say**: "Tell us what app you want, we'll give you a blank canvas"
- **We say**: "Tell us what you're trying to do, we'll give you the app you need, and it updates itself"

## 🔄 Apps as Living Systems

Unlike static "publish once" apps, Mosaic creates **living companions** that evolve as your context changes:

- **Location-aware**: Different widgets when you're home vs. traveling
- **Time-sensitive**: Morning routine vs. evening wind-down apps
- **Role-adaptive**: Work mode vs. family time configurations
- **Goal-oriented**: Automatically surface relevant capabilities

## 🧠 Intelligent App Generation

1. **Describe Your Goal**: "I'm visiting Tokyo for 7 days. Here's my flight number."
2. **AI Analysis**: Mosaic understands your intent and context
3. **Auto-Assembly**: Pulls relevant widgets from MCP servers:
   - Flight tracking & airport info
   - Tokyo weather & local conditions
   - Currency converter (JPY)
   - Tokyo transit & maps
   - Local events & recommendations
   - Translation tools
4. **Adaptive Layouts**: Choose from templates that fit your usage patterns
5. **Living Updates**: App evolves as your trip progresses

## 🔌 MCP-Powered Architecture

Because everything is exposed via MCP manifests, Mosaic can:

- **Auto-discover** relevant capabilities
- **Intelligently wire** the right widgets for your goals
- **Continuously adapt** as new MCP servers come online
- **Cross-reference** data between different services

## 🏗️ Technical Architecture

1. **AI Goal Parser**: Natural language → app requirements
2. **MCP Discovery Engine**: Finds relevant capabilities from registered servers
3. **Intelligent Assembly**: Auto-wires widgets based on context and goals
4. **Adaptive Templates**: Multiple layouts optimized for different use cases
5. **Living Updates**: Continuous evolution based on usage and context

## 💡 Strategic Vision

### Windows as the OS for Dynamic Task Apps

- Self-updating applications that span devices
- Context-aware experiences that follow you
- Seamless integration with your digital ecosystem
- The stickiness factor: not a novelty, but a companion that grows with you

## 🚀 Example Scenarios

**Business Traveler**: "I have meetings in Singapore next week"
→ Flight tracking, weather, currency, local business hours, meeting scheduler, timezone converter

**New Parent**: "I just had a baby and need to track everything"
→ Feeding tracker, sleep monitor, pediatrician finder, milestone tracker, baby store locator

**College Student**: "I'm starting freshman year at UC Berkeley"
→ Class schedule, campus map, dining hall hours, study groups, local weather, campus events

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
