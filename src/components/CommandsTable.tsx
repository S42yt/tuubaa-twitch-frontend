'use client';

import { useState } from 'react';

export interface Command {
  command: string;
  aliases: string[];
  user: string;
  description: string;
}

interface CommandsProps {
  commands: Command[];
}

export default function Commands({ commands }: CommandsProps) {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

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

  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Desktop view */}
      <div className="hidden sm:block max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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

      {/* Mobile view */}
      <div className="sm:hidden space-y-4">
        {commands.map((cmd, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div 
              className="px-4 py-3 bg-gray-700 flex justify-between items-center cursor-pointer"
              onClick={() => toggleRow(index)}
            >
              <div className="text-purple-400 font-mono font-medium">{cmd.command}</div>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  copyToClipboard(cmd.command);
                }}
                className="p-2 text-white bg-purple-600 hover:bg-purple-700 rounded transition-colors duration-200 focus:outline-none"
              >
                {copiedCommand === cmd.command ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                )}
              </button>
            </div>
            
            {(expandedRow === index) && (
              <div className="px-4 py-3 border-t border-gray-700">
                <div className="mb-2">
                  <span className="text-gray-400 font-semibold text-sm">User Access:</span>
                  <div className="text-gray-200">{cmd.user}</div>
                </div>
                <div className="mb-2">
                  <span className="text-gray-400 font-semibold text-sm">Description:</span>
                  <div className="text-gray-300">{cmd.description}</div>
                </div>
                {cmd.aliases.length > 0 && (
                  <div>
                    <span className="text-gray-400 font-semibold text-sm">Aliases:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {cmd.aliases.map((alias, i) => (
                        <button
                          key={i}
                          onClick={() => copyToClipboard(alias)}
                          className="px-2 py-1 text-sm text-gray-200 bg-gray-700 hover:bg-gray-600 rounded font-mono flex items-center"
                        >
                          {alias}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}