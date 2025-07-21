import {groq} from "@ai-sdk/groq";
import { streamText } from "ai";

export const maxDuration = 30;

export const POST = async (req : Request) => {
    const {messages} = await req.json();

    const result = streamText({
        model: groq("llama-3.3-70b-versatile"),
        messages
    })

    return result.toDataStreamResponse()
}