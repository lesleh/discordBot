import dotenv from "dotenv";
import Discord from "discord.js"; //import discord.js
import { OpenAIApi, Configuration } from "openai";
import { MOTIVATE_ME_TO_TRIGGER, motivateMeTo } from "./motivator.mjs";
import { getCommand } from "./commands.mjs";

dotenv.config();

const client = new Discord.Client({
  intents: [
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildMessages,
    Discord.IntentsBitField.Flags.MessageContent,
  ],
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  const { content } = message;
  getCommand(content)?.(openai, content).then((response) => {
    message.reply(response);
  });
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
