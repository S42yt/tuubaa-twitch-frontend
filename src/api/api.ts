const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'localhost:4000';
const API_URL = rawApiUrl.startsWith('http') ? rawApiUrl : `http://${rawApiUrl}`;

export interface CommandMetadata {
  command: string;
  aliases?: string[];
  user: string;
  description: string;
}

/**
 * Fetches all commands from the API
 */
export async function getAllCommands(): Promise<CommandMetadata[]> {
  try {
    const response = await fetch(`${API_URL}/commands`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching commands: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch commands:', error);
    throw error;
  }
}