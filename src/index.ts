import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Import the tool modules
import { registerHomeAssistantApiTools } from "./tools/homeassistant/index.js";

// Criando o servidor MCP
const server = new McpServer({
  name: "Home Assistant API MCP",
  version: "0.1.0",
  capabilities: {
    tools: {},
    resources: {},
    prompts: {}
  }
});

// Register all tools
registerHomeAssistantApiTools(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Home Assistant API Service running via stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});