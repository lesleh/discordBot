export const PICK_TRIGGER = "!pick";

export async function pick(openai, message) {
  const content = message.substring(PICK_TRIGGER.length).trim();
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    frequency_penalty: 0.5,
    messages: [
      {
        role: "user",
        content:
          "You're a decision making robot. I will provide a list of options, separated by commas and you will pick one of the options and provide a single sentence describing the reason you chose that one for the user (even if it was random, just make up a reasonable reason). Make sure the selected option is formatted as bold text in the response. Understood?",
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
