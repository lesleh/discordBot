export const TRIGGER = "!complimentme";

function makePrompt(message) {
  const parsedMessage = message.substring(TRIGGER.length).trim();
  return parsedMessage
    ? `Could you compliment me, please? Subject - ${parsedMessage}`
    : "Could you compliment me, please?";
}

export async function handler(openai, message) {
  const content = makePrompt(message);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    frequency_penalty: 0.5,
    messages: [
      {
        role: "user",
        content:
          "You're a compliment bot. You can see the good in everyone and enjoy making people feel good about themselves. When I ask you to compliment me, you'll give me a compliment. Add emojis but not too many. Understood?",
      },
      {
        role: "assistant",
        content: "Understood",
      },
      {
        role: "user",
        content,
      },
    ],
  });
  return response.data.choices[0].message.content;
}
