import { connectDB } from "@/utils/database";

export const GET = (request: Request) => {
    console.log(request)
    return new Response("Hello World")
}