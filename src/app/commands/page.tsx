"use client";

import { useState } from 'react';
export const dynamic = "force-dynamic";

export default function Commands() {
  const commands = [
    { 
      command: "!help", 
      aliases: ["!commands", "!cmds"],
      user: "Everyone", 
      description: "Shows available commands" 
    },
    { 
      command: "!uptime", 
      aliases: ["!live"],
      user: "Everyone", 
      description: "Shows how long the stream has been live" 
    },
    { 
      command: "!followage", 
      aliases: ["!following"],
      user: "Everyone", 
      description: "Shows how long you've been following" 
    },
    { 
      command: "!ban", 
      aliases: [],
      user: "Moderators", 
      description: "Bans a user from chat" 
    },
    { 
      command: "!clear", 
      aliases: ["!clr"],
      user: "Moderators", 
      description: "Clears the chat history" 
    },
  ];

  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const formatCommandWithAliases = (command: string, aliases: string[]) => {
    if (aliases.length === 0) {
      return command;
    }
    return (
      <span>
        {command}
        <span className="block text-xs text-gray-400 mt-1">
          Aliases: {aliases.join(', ')}
        </span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-500 mb-8 sm:mb-12">Commands</h1>
      
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-white font-semibold">Command</th>
                <th className="px-3 sm:px-6 py-3 text-white font-semibold">User Access</th>
                <th className="px-3 sm:px-6 py-3 text-white font-semibold">Description</th>
                <th className="px-3 sm:px-6 py-3 text-white font-semibold sr-only">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {commands.map((cmd, index) => (
                <tr 
                  key={index} 
                  className="transition-all duration-200 ease-in-out hover:bg-gray-700/80"
                >
                  <td className="px-3 sm:px-6 py-4 text-purple-400 font-mono">
                    {formatCommandWithAliases(cmd.command, cmd.aliases)}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-gray-200 text-sm sm:text-base">{cmd.user}</td>
                  <td className="px-3 sm:px-6 py-4 text-gray-300 text-sm sm:text-base">{cmd.description}</td>
                  <td className="px-2 sm:px-4 py-4 text-right">
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => copyToClipboard(cmd.command)}
                        className="p-2 text-white bg-purple-600 hover:bg-purple-700 rounded transition-colors duration-200 focus:outline-none"
                        title={copiedCommand === cmd.command ? "Copied!" : "Copy to clipboard"}
                      >
                        {copiedCommand === cmd.command ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        )}
                      </button>
                      
                      {cmd.aliases.length > 0 && (
                        <div className="dropdown relative group">
                          <button 
                            className="p-2 text-white bg-gray-600 hover:bg-gray-500 rounded transition-colors duration-200 focus:outline-none"
                            title="Show aliases"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          <div className="dropdown-menu hidden group-hover:block absolute right-0 top-full mt-1 bg-gray-700 rounded shadow-lg z-10 w-40">
                            {cmd.aliases.map((alias, i) => (
                              <button
                                key={i}
                                onClick={() => copyToClipboard(alias)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 font-mono"
                              >
                                {alias}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}