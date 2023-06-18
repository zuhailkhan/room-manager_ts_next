import Ticket, { Ticket as ITicket } from "@/models/Ticket";
import { connectDB } from "@/utils/database";
import { HydratedDocument, models } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async ( request: NextRequest ) => {
    // use state Management here to get id of the logged in user
    const id = '648b07cb8351c81347b3bff5'
    // second check authentication ?
    try {
        await connectDB();
        const tickets: HydratedDocument<ITicket>[] = await Ticket.find({ submitterId: id }).populate({
            path: 'submitterId',
            select: 'username _id role'
        })
        return NextResponse.json({
            tickets,
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            "message": "Something went wrong",
            "type" : "Internal Server Error",
            Error: error
        })
    }
}