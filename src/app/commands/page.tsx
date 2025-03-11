import Commands, { Command } from '@/components/CommandsTable';
export const dynamic = "force-dynamic";

export default function CommandsPage() {
  const commands: Command[] = [
    { 
      command: "!ban", 
      aliases: ["permaban"],
      user: "Wachhunde/Mods", 
      description: "Bannt einen Nutzer permanent aus dem Kanal (z.B. !ban @nutzer Grund)" 
    },
    {
      command: "!category",
      aliases: [],
      user: "Wachhunde/Mods",
      description: "Ändert die Kategorie des Streams oder zeigt die aktuelle an"
    },
    {
      command: "!commands",
      aliases: ["cmd", "cmds","help","befehle", "hilfe"],
      user: "Jeder",
      description: "Zeigt den Link zu den Befehlen"
    },
    {
      command: "!discord",
      aliases: ["dc", "community"],
      user: "Jeder",
      description: "Zeigt den Link zum Discord-Server"
    },
    {
      command: "!followage",
      aliases: [],
      user: "Jeder",
      description: "Zeigt an, wie lange du einem Kanal bereits folgst"
    },
    {
      command: "!lurk",
      aliases: [],
      user: "Jeder",
      description: "Zeigt an, dass du gerade lurkst"
    },
    {
      command: "!mod",
      aliases: [],
      user: "Wachhunde/Mods",
      description: "Moderations-Tool: !mod [timeout|ban|unban] @nutzer [dauer] [grund]"
    },
    {
      command: "!ping",
      aliases: [],
      user: "Jeder",
      description: "Zeigt den aktuellen Ping des Bots"
    },
    {
      command: "!timeout",
      aliases: ["to"],
      user: "Wachhunde/Mods",
      description: "Timeout einen Nutzer für eine bestimmte Zeit (z.B. !timeout @nutzer 10m Spam)"
    },
    {
      command: "!title",
      aliases: [],
      user: "Wachhunde/Mods",
      description: "Ändert den Titel des Streams"
    },
    {
      command: "!unban",
      aliases: ["pardon"],
      user: "Wachhunde/Mods",
      description: "Entbannt einen Nutzer aus dem Kanal (z.B. !unban @nutzer)"
    },
    {
      command: "!youtube",
      aliases: ["yt", "videos"],
      user: "Jeder",
      description: "Zeigt den Link zu dem YouTube Kanal"
    },
    {
      command: "!unlurk",
      aliases: [],
      user: "Jeder",
      description: "Beendet deinen Lurk-Modus"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-500 mb-8 sm:mb-12">Commands</h1>
      <Commands commands={commands} />
    </div>
  );
}