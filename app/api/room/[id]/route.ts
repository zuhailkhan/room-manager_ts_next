import Room, { IRoom } from "@/models/Room";
import { IUser } from "@/models/User";
import { connectDB } from "@/utils/database";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest,  {params}: any): Promise<NextResponse> => {
    const { id } = params
    if(!id) {
        return NextResponse.json({
            message: "Invalid Request"
        }, {
            status: 400,
        })
    }
    try {
        await connectDB();
        interface _room extends HydratedDocument<IRoom> {
            occupiedBy: IUser
        }
        const room: _room | null = await Room.findById(id).populate({
            path: 'occupiedBy',
            select: 'username _id role email'
        }).lean()
        if(!room) {
            return NextResponse.json({
                message: "Room not found"
            }, {
                status: 400, 
                statusText: "Bad Request | Room Invalid"
            })
        }

        else {
            return NextResponse.json({
                room
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            "message": "Something went wrong",
            Error: error
        }, {
            status: 500,
            statusText: "Internal Server Error"
        });
    }     
}