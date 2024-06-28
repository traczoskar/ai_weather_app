import { useQuery } from "@tanstack/react-query";
import { ChatPrompt } from "../../types/types";

const getAIResponse = async (prompt: ChatPrompt) => {
  try {
    const response = await fetch(import.meta.env.VITE_MAKE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("response", response);
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching AI completion:", error);
    return error;
  }
};

export const useAIResponse = (prompt: ChatPrompt) => {
  return useQuery({
    queryKey: ["ai", prompt],
    queryFn: () => getAIResponse(prompt),
    retry: false,
    enabled: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
