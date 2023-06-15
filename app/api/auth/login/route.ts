import { connectDB } from "@/utils/database";
import User, { IUser } from "@/models/User";
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const { username, password } = await request.json()
    try {
        await connectDB()

        let user: IUser | null = await User.findOne({ username })
        if(user) {
            const match: boolean = await bcrypt.compare(password, user.password)
            if(match) {
                return NextResponse.json({
                    message: `${user.username} logged in`
                }, { status: 200})
            } else {
                return NextResponse.json({
                    error: "Wrong password"
                }, { status: 400 })
            }
        } else {
            return NextResponse.json({
                error: "User does not exist"
            },{
                status: 400
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: "Something went wrong",
            type: "Internal Server Error"
        }, {
            status: 500
        })
    }
}

// create user route