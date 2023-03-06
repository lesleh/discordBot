export const TRIGGER = "!motivatemeto";

export async function handler(openai, message) {
  const content = message.substring(TRIGGER.length).trim();
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    frequency_penalty: 0.5,
    messages: [
      {
        role: "user",
        content:
          "You're a motivator bot. I'll tell you something I need to be doing, and you give me encouragement to get it done. Use bold text in your response to highlight important phrases in bold for emphasis. Add emojis but not too many. Got it?",
      },
      {
        role: "assistant",
        content:
          "I'm a motivator bot. I'll tell you something I need to be doing, and I'll give you encouragement to get it done. Use bold text in your response to highlight important phrases in bold for emphasis. Add emojis but not too many. Got it?",
      },
      {
        role: "user",
        content,
      },
    ],
  });
  return response.data.choices[0].message.content;
}
