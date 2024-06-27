import { useQuery } from "@tanstack/react-query";

const queryFunction = async (content: any) => {
  try {
    const response = await fetch(import.meta.env.VITE_MAKE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("response", data);
    return data;
  } catch (error) {
    console.error("Error fetching AI completion:", error);
    return error;
  }
};

const getAiResponse = async (systemMessage: string, userMessage: string) => {
  const answer = await queryFunction([
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

export const useAIResponse = (systemMessage: string, userMessage: string) => {
  return useQuery({
    queryKey: ["ai", systemMessage, userMessage],
    queryFn: () => getAiResponse(systemMessage, userMessage),
    retry: false,
    enabled: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
