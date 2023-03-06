import { MOTIVATE_ME_TO_TRIGGER, motivateMeTo } from "./motivator.mjs";
import { PICK_TRIGGER, pick } from "./picker.mjs";

export const commands = {
  [MOTIVATE_ME_TO_TRIGGER]: motivateMeTo,
  [PICK_TRIGGER]: pick,
};

/**
 *
 * @param {*} message the message content
 * @returns {(openai: OpenAIApi, content: string) => Promise<string> | null} the command function or null if no command is found
 */
export function getCommand(content) {
  const command = content.split(" ")[0];
  return commands[command] ?? null;
}
