import { AI_MODEL } from "./config.js";
import { GEMINI_API_KEY } from "./secret.js";

export async function askAi(prompt) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_KEY") {
    throw new Error("Добавьте GEMINI_API_KEY в файл secret.js");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.error?.message || `Ошибка AI: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("AI не вернул текстовый ответ");
  }

  return text;
}
