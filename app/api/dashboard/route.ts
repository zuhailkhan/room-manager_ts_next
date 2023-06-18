import { connectDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest) => {
    try {
        await connectDB()
        // let query = [
        //     {
        //         $lookup: {
        //             from: "users",
        //             localField: "user_id",
        //             foreignField: "_id",
        //             as: "user"
        //         }
        //     },
        //     {
        //         $unwind: 'user'
        //     }
        // ]
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