import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY!,
});

export const generateCompletion = async (prompt: string) => {
  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 300,
    });
  
    const output = chat.choices[0]?.message?.content?.trim();
  
    return output;
  } catch (error) {
    console.error("generateCompletion error: ", error);
    throw new Error(`Failed to generate: ${String(error)}`);
  }
};
