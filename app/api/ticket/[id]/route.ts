// Get a Specific Ticket Details
import Ticket, { Ticket as ITicket } from "@/models/Ticket";
import { connectDB } from "@/utils/database";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
// SERVER_URL/api/ticket/{id}/
export const GET = async ( request: NextRequest, { params }:any ) => {
    const { id } = params
    if(!id) return NextResponse.json({
        "message": "Invalid ID",
    })
    try {
        await connectDB();
        const ticket: HydratedDocument<ITicket> | null = await Ticket.findById(id);
        if(ticket) {
            const populatedTicket = await ticket.populate({
                path: 'submitterId',
                select: 'username _id role'
            })
            return NextResponse.json({
                populatedTicket
            })
        } else {
            return NextResponse.json({
                "message": "Ticket not found",
            })
        }
    } catch (error) {
        return NextResponse.json({
            "message": "Something went wrong",
            Error: error
        }, {
            status: 500,
            statusText: "Internal Server Error",
        })
    }
}

export const DELETE = async ( request: NextRequest, { params }:any ) => {
    const { id } = params
    if(!id) return NextResponse.json({
        "message": "Invalid ID",
    })
    try {
        await connectDB();
        const ticket: HydratedDocument<ITicket> | null = await Ticket.findById(id);
        if(ticket) {
            const deletedTicket = await ticket.deleteOne()
            return NextResponse.json({
                deletedTicket
            })
        } else {
            return NextResponse.json({
                "message": "Ticket not found",
            })
        }
    } catch (error) {
        return NextResponse.json({
            "message": "Something went wrong",
            Error: error
        }, {
            status: 500,
            statusText: "Internal Server Error",
        }
    )}
}

export const PATCH = async ( request: NextRequest, { params }:any ) => {
    const { id } = params
    const updationData = await request.json()
    if(!id) {
        return NextResponse.json({
            "message": "Invalid ID",
        }, {
            status: 400
        })
    }

    try {
        await connectDB()

        const ticket: HydratedDocument<ITicket> | null = await Ticket.findById(id);
        if(ticket) {
            const updatedTicket = await ticket.updateOne({
                ...updationData
            })

            return NextResponse.json({
                message: "Ticket updated",
                newTicket: updatedTicket
            })
        } else {
            return NextResponse.json({
                "message": "Ticket not found",
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            "message": "Something went wrong",
            Error: error
        }, {
            status: 500,
            statusText: "Internal Server Error",
        })
    }
}