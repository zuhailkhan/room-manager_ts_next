import Room, { IRoom } from "@/models/Room";
import { connectDB } from "@/utils/database";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async ( request: NextRequest ) => {
    try {
        await connectDB()

        const rooms: HydratedDocument<IRoom>[] = await Room.find({ status: true }).populate({
            path: 'occupiedBy',
            select: 'username _id role email',
        }).lean();
        if(rooms.length) {
            return NextResponse.json({
                rooms
            }, {
                status: 200
            })
        } else {
            return NextResponse.json({
                message: "No rooms found"
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
        })
    }
    return NextResponse
}