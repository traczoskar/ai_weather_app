import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

const requestFunction = async (content: any) => {
  const prompt = await openai.chat.completions.create({
    messages: content,
    model: "gpt-3.5-turbo",
  });
  const response = prompt.choices[0].message.content;
  console.log("AI response: ", response);
  return response;
};

export const getAiResponse = async (
  systemMessage: string,
  userMessage: string
) => {
  const answer = await requestFunction([
    {
      role: "system",
      content: systemMessage,
    },
    {
      role: "user",
      content: userMessage,
    },
  ]);
  return answer;
};
