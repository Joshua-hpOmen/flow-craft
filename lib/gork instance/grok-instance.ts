import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getGroqChatCompletion = async (jsonBody : string, prompt: string) => {
    try {
        const response = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: "You are a webscrapper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you want to extract. The respone should always be only the extracted data as a JSON array or object, without any additional words or explanation. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empy JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text. YOUR REPLYS are only and always to be JSON objects nothing else this is the most important thing. Dont ever return things that is not the JSON object. I dont want any fluff words I just want the JSON object response. Make sure the JSON objects adhere to JSON syntax and dont prefix the object with json. The selectors values should be the same thing as if i were going to inspect with devtools on my browser and right click and select copy as selector.",
            },
            {
                role: "user",
                content: jsonBody
            },
            {
                role: "user",
                content: prompt
            }
          ],
          model: "llama-3.1-8b-instant",
          temperature: 1,
        });
      
        return [response.choices[0].message.content, response.usage?.prompt_tokens || 0, response.usage?.completion_tokens || 0]
    } catch (error) {
        console.error("🔴This is the error is the groq chat completion",error)
        return null
    }
}
