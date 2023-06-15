import Ticket, { Ticket as ITicket } from "@/models/Ticket";
import User from "@/models/User";
import { connectDB } from "@/utils/database";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async ( request: NextRequest, { params }:any ) => {
    const { id } = params
    if(!id) return NextResponse.json({
        "message": "Invalid ID",
    })
    const assigneeId = new URL(request.nextUrl).searchParams.get('assigneeId')
    if(!assigneeId) {
        return NextResponse.json({
            "message": "Invalid Assignee",
        })
    }
    try {
        await connectDB();
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return NextResponse.json({
                "message": "Ticket not found",
            })
        } else {
            const assignee = await User.findById(assigneeId).where({'role.id': 1});
            if(!assignee) {
                return NextResponse.json({
                    "message": "Assignee not found",
                })
            } else {
                if(assignee._id) {
                    return NextResponse.json({
                        "message": "Ticket already assigned",
                    })
                }
                await ticket.updateOne({
                    AssignedToId: assigneeId
                })
                return NextResponse.json({
                    message: `Ticket Assigned successfully to ${assignee.username}`,
                }, {
                    status: 200
                })
            }
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