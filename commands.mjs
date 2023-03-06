import { readdir } from "fs/promises";

export const commands = {};

/**
 *
 * @param {*} message the message content
 * @returns {(openai: OpenAIApi, content: string) => Promise<string> | null} the command function or null if no command is found
 */
export function getCommand(content) {
  const command = content.split(" ")[0];
  return commands[command] ?? null;
}

/**
 * Registers a new command
 * @param {(openai: OpenAIApi, content: string) => Promise<string> | null} command the command function
 * @param {string} trigger the command trigger
 */
export function registerCommand(command, trigger) {
  commands[trigger] = command;
}

export function unregisterCommand(trigger) {
  delete commands[trigger];
}

export async function registerAllCommands() {
  const files = await readdir("./commands");
  for (const file of files) {
    const { handler, TRIGGER } = await import(`./commands/${file}`);
    if (handler && TRIGGER) registerCommand(handler, TRIGGER);
  }
}

await registerAllCommands();
