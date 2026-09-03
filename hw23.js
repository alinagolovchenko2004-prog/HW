import { GoogleGenAI } from "@google/genai";

async function askAi(prompt) {
  const genAi = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  const response = await genAi.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
}

async function main() {
  const prompt =
    "Напиши что такое REST API и как его использовать в JavaScript. Обязательно добавь HTTP status codes с расшифровкой каждого.";

  const aiResponse = await askAi(prompt);

  // console.log("AI Response:", aiResponse);

  const lines = aiResponse.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/[1-5][0-9][0-9]/)){
      console.log("HTTP status code:");
      console.log( lines[i]);
    }
  }
  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  for (let i = 0; i < methods.length; i++) {
    const count = aiResponse.split(methods[i]).length - 1;
    console.log("REST methods count:")
    console.log(methods[i] + ": " + count);
  }
}

main();