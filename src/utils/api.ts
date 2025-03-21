import axios from "axios";
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

/**
 * Helper function to format error responses for tools
 * @param message Error message to display
 * @returns Formatted error response for MCP
 */
export function formatErrorResponse(message: string) {
    return {
      content: [{ 
        type: "text" as const, 
        text: message 
      }],
      isError: true
    };
  }

/**
 * Helper function to make GET requests to the Football API
 * @param endpoint API endpoint path
 * @param params Query parameters
 * @returns API response data
 */
async function getHomeAssistantApi(endpoint: string) {
  try {
    const url = `${process.env.HOME_ASSISTANT_URL}${endpoint}`;
    console.error(`Making request to: ${url}`);
    
    // O API key deve ser configurado como variável de ambiente
    const bearerToken = process.env.HOME_ASSISTANT_TOKEN;

    if (!bearerToken) {
      console.error('HOME_ASSISTANT_TOKEN environment variable is not set')
      process.exit(1)
    }
    
    console.log(bearerToken);
    console.log(url);
    
    const response = await axios.get(url, { 
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    });
    
    return { 
      data: response.data,
      success: true
    };
  } catch (error: any) {
    console.error(`Failed to get Home Assistant API: ${error.message}`);
    
    // Tratamento de erros da API de forma estruturada
    if (error.response) {
      return {
        success: false,
        statusCode: error.response.status,
        message: error.response.data?.message || error.message,
        error: error.response.data
      };
    }
    
    return {
      success: false,
      message: error.message,
      error
    };
  }
} 

async function getHomeAssistantState(entity_id: string) {
  try {
    const url = `${process.env.HOME_ASSISTANT_URL}/api/states/${entity_id}`;
    console.error(`Making request to: ${url}`);
    
    // O API key deve ser configurado como variável de ambiente
    const bearerToken = process.env.HOME_ASSISTANT_TOKEN;

    if (!bearerToken) {
      console.error('HOME_ASSISTANT_TOKEN environment variable is not set')
      process.exit(1)
    }    
    
    const response = await axios.get(url, { 
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    });
    
    return { 
      data: response.data,
      success: true
    };
  } catch (error: any) {
    console.error(`Failed to get Home Assistant State: ${error.message}`);
    
    // Tratamento de erros da API de forma estruturada
    if (error.response) {
      return {
        success: false,
        statusCode: error.response.status,
        message: error.response.data?.message || error.message,
        error: error.response.data
      };
    }
    
    return {
      success: false,
      message: error.message,
      error
    };
  }
} 

async function callHomeAssistantService(entity_id: string, domain: string, service: string) {
  try {
    const url = `${process.env.HOME_ASSISTANT_URL}/api/services/${domain}/${service}`;
    console.error(`Making request to: ${url}`);
    
    // O API key deve ser configurado como variável de ambiente
    const bearerToken = process.env.HOME_ASSISTANT_TOKEN;

    if (!bearerToken) {
      console.error('HOME_ASSISTANT_TOKEN environment variable is not set')
      process.exit(1)
    }    
    
    const response = await axios.post(url, 
      {
        entity_id: entity_id
      }, 
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );
    
    return { 
      data: response.data,
      success: true
    };
  } catch (error: any) {
    console.error(`Failed to call service: ${error.message}`);
    
    // Tratamento de erros da API de forma estruturada
    if (error.response) {
      return {
        success: false,
        statusCode: error.response.status,
        message: error.response.data?.message || error.message,
        error: error.response.data
      };
    }
    
    return {
      success: false,
      message: error.message,
      error
    };
  }
} 

export { getHomeAssistantApi, getHomeAssistantState, callHomeAssistantService };