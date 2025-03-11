import Commands from '@/components/CommandsTable';
import { getAllCommands } from '@/api/api';
export const dynamic = "force-dynamic";

export default async function CommandsPage() {
  
  let commands = [];
  let error = null;
  
  try {
    const fetchedCommands = await getAllCommands();
    commands = fetchedCommands.map(cmd => ({
      ...cmd,
      aliases: cmd.aliases || []
    }));
  } catch (err) {
    console.error('Failed to fetch commands from API:', err);
    error = err instanceof Error ? err.message : 'Unknown error occurred';
    
    
    commands = [
      { 
        command: "!ban", 
        aliases: ["permaban"],
        user: "Wachhunde/Mods", 
        description: "Bannt einen Nutzer permanent aus dem Kanal (z.B. !ban @nutzer Grund)" 
      },
    ];
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-500 mb-8 sm:mb-12">Commands</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-md">
          <p className="text-red-400">Failed to load commands from server: {error}</p>
          <p className="text-gray-400 text-sm mt-1">Showing default commands instead.</p>
        </div>
      )}
      
      {commands.length > 0 ? (
        <Commands commands={commands} />
      ) : (
        <p className="text-center text-gray-400">No commands available.</p>
      )}
    </div>
  );
}