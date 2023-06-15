import { NextRequest, NextResponse } from 'next/server';
import User, { IUser } from "@/models/User"
import { HydratedDocument } from 'mongoose';

interface IParams {
    params: {
        id: string
    },
}

export const GET = async (request: NextRequest, {params}: IParams) => {
    const regex = /^[0-9a-fA-F]{24}$/
    if(!(regex.test(params.id))) {
        return NextResponse.json({
            message: "Invalid ObjectID"
        }, {
            status: 400,
            statusText: "Bad Request"
        })
    }
    try {
        const user: HydratedDocument<IUser> | null = await User.findById(params.id).select('-password')
        if(user) {
            return NextResponse.json({
                user
            }, {
                status: 200
            })
        } else {
            return NextResponse.json({
                message: "User not found"
            }, {
                status: 404,
                statusText: "Not Found",
            })
        }
    } catch (error) {
        return NextResponse.json({
            "message": "Something went wrong",
            "type" : "Internal Server Error",
            Error: error
        }, {
            status: 500
        })
    }
}

// export const PATCH = async (request: NextRequest, {params}: IParams) => {

// }