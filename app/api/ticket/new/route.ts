import Ticket, { Ticket as ITicket } from "@/models/Ticket"
import { connectDB } from "@/utils/database"
import { HydratedDocument } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {

    const {
        title,
        description,
        submitterId,
    } = await request.json()
    try {

        await connectDB();

        const ticket = new Ticket({
            title,
            description,
            submitterId,
        })
        await ticket.save()
        return NextResponse.json({
            "message": "Ticket created successfully",
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            "message": "Something went wrong",
            Error: error
        }, {
            status: 500,
            statusText: "Internal Server Error"
        })
    }
}