import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getHomeAssistantApi, getHomeAssistantState, callHomeAssistantService, formatErrorResponse } from "../../utils/api.js";

/**
 * Register tools related to Home Assistant API
 * @param server Instance of the MCP server
 */
export function registerHomeAssistantApiTools(server: McpServer) {
  //Tool to verify if the Home Assistant API is online
  server.tool(
    "homeassistant_api",  
    "Verify if the Home Assistant API is online",
    async () => {
      console.error(`Verificando Home Assistant`);
      
      const result = await getHomeAssistantApi('/api/');
      
      if (!result.success) {
        return formatErrorResponse(`Erro ao pesquisar time: ${result.message}`);
      }
      
      // Formata os dados da resposta
      const response = result.data;
      
      if (!response.results || response.results === 0) {
        return {
          content: [{ 
            type: "text" as const, 
            text: response.message 
          }]
        };
      }
      
      const responseMessage = response.message;
      
      return {
        content: [{ 
          type: "text" as const, 
          text: responseMessage
        }]
      };
    }
  );

  //Tool to get the state of a Home Assistant entity
  server.tool(
    "homeassistant_get_state",  
    "Get the state of a Home Assistant entity",
    {
      entity_id: z.string().describe("The entity ID of the Home Assistant entity")
    },
    async ({ entity_id }) => {  
      console.error(`Verificando Home Assistant`);
      
      const result = await getHomeAssistantState(entity_id);
      
      if (!result.success) {
        return formatErrorResponse(`Erro ao pesquisar time: ${result.message}`);
      }
      
      // Formata os dados da resposta
      const response = result.data;
      
      if (!response.results || response.results === 0) {
        return {
          content: [{ 
            type: "text",
            text: `Name: ${response.attributes.friendly_name || "Unknown"}\nEntity: ${entity_id}\nState: ${response.state || "Unknown"}\nLast Updated: ${response.last_updated || "Unknown"}\n\nAttributes: ${JSON.stringify(response.attributes)}`
          }]
        };
      }
      
      const responseMessage = response.message;
      
      return {
        content: [{ 
          type: "text" as const, 
          text: responseMessage
        }]
      };
    }
  );

  //Tool to set the state of a Home Assistant entity
  server.tool(
    "homeassistant_call_service",  
    "Call a service of a Home Assistant entity",
    {
      entity_id: z.string().describe("The entity ID of the Home Assistant entity"),
      domain: z.string().describe("The domain of the service"),
      service: z.string().describe("The service to call")
    },
    async ({ entity_id, domain, service }) => {  
      console.error(`Verificando Home Assistant`);
      
      const result = await callHomeAssistantService(entity_id, domain, service);
      
      if (!result.success) {
        return formatErrorResponse(`Failed to call service: ${result.message}`);
      }
      
      // Formata os dados da resposta
      const response = result.data;
      
      if (!response.results || response.results === 0) {
        return {
          content: [{ 
            type: "text",
             text: `Name: ${response[0].attributes.friendly_name || "Unknown"}\nEntity: ${entity_id}\nState: ${response[0].state || "Unknown"}\nLast Updated: ${response[0].last_updated || "Unknown"}\n\nAttributes: ${JSON.stringify(response[0].attributes)}`
          }]
        };
      }
      
      const responseMessage = response.message;
      
      return {
        content: [{ 
          type: "text" as const, 
          text: responseMessage
        }]
      };
    }
  );
} 