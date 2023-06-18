import Room, { IRoom } from "@/models/Room";
import User, { IUser } from "@/models/User";
import { connectDB } from "@/utils/database";
import { HydratedDocument, Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const { roomno, tier, status, assignedUser, expiresAt } = await request.json();

    if([roomno, tier, status, status, assignedUser, expiresAt].some(x => x === null)) {
        return NextResponse.json({
            message: "Invalid Request"
        }, {
            status: 400,
        })
    }

    try {
        
        await connectDB()

        const isUserExists: number = await User.count(assignedUser)
        if(!isUserExists) {
            return NextResponse.json({
                message: "User not found"
            }, {
                status: 400, 
                statusText: "Bad Request | User Invalid"
            })
        } else {
            const room: HydratedDocument<IRoom> = new Room({
                roomno,
                tier,
                status,
                occupiedBy: new Types.ObjectId(assignedUser),
                expiresAt: new Date(expiresAt)
            })

            await room.save();
            const populatedDoc = await Room.findById(room._id).populate({
                path: 'occupiedBy',
                select: 'username _id role email' 
            })
            return NextResponse.json({
                message: "Room created",
                room: populatedDoc
            },{
                status: 200,
                statusText: 'Success'
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
}