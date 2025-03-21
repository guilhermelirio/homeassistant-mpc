[![smithery badge](https://smithery.ai/badge/@guilhermelirio/homeassistant-mpc)](https://smithery.ai/server/@guilhermelirio/homeassistant-mpc)

# Home Assistant MCP

This is an MCP (Model Context Protocol) server that provides tools for integration with Home Assistant, allowing AI assistants to interact with smart home devices.

## Setup

### Installing via Smithery

To install Home Assistant Integration for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@guilhermelirio/homeassistant-mpc):

```bash
npx -y @smithery/cli install @guilhermelirio/homeassistant-mpc --client claude
```

### Manual Installation
1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:
   - Obtain a Long-Lived Access Token from your Home Assistant
   - Configure the environment variables in a `.env` file at the project root:

```
HOME_ASSISTANT_URL=http://your-home-assistant:8123
HOME_ASSISTANT_TOKEN=your_token_here
```

## Starting the server

```bash
npm start
```

For development:

```bash
npm run dev
```

## Available Tools

### Home Assistant API Verification

- **homeassistant_api**: Verifies if the Home Assistant API is online
  - Parameters: none
  - Example: `homeassistant_api()`

### Get Entity State

- **homeassistant_get_state**: Gets the current state of a Home Assistant entity
  - Parameters: `entity_id` (entity ID)
  - Example: `homeassistant_get_state("light.living_room")`

### Call Services

- **homeassistant_call_service**: Calls a service for a Home Assistant entity
  - Parameters:
    - `entity_id` (entity ID)
    - `domain` (service domain)
    - `service` (service to call)
  - Example: `homeassistant_call_service("light.living_room", "light", "turn_on")`

## Development

This project uses TypeScript and the MCP SDK library to create tools that can be accessed by language models such as Claude, GPT, etc.

To add new tools:

1. Create a module in `src/tools/[category]`
2. Implement your tools following the existing pattern
3. Register the module in `src/index.ts`

## Contributions

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
