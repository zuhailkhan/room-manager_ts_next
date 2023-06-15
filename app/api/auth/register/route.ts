import { NextRequest, NextResponse } from "next/server"
import User, { IUser } from "@/models/User"
import { connectDB } from "@/utils/database"
import bcrypt from 'bcryptjs'
import { HydratedDocument } from "mongoose"

export const POST = async (request: NextRequest) => {
    const { username, email, password } = await request.json()
    if([username, email, password].some((value) => !value)) {
        return NextResponse.json({
            message: "All fields are required"
        }, {
            status: 400
        })
    }

    try {
        await connectDB()

        const user = await User.count({ $or: [ { username }, { email } ] })
        if(user <= 0) {
            const hashedPassword = bcrypt.hashSync(password, 10)

            const newUser: HydratedDocument<IUser> = new User({
                username,
                email,
                password: hashedPassword
            })

            if(!newUser || !hashedPassword) {
                throw new Error("Something went wrong")
            }

            const result = await newUser.save()
            return NextResponse.json({
                message: "User created successfully",
                user: {
                    id: result._id,
                    username: result.username,
                    email: result.email
                }
            }, {
                status: 201
            })
        } else {
            return NextResponse.json({
                "message": "User with email/username already exists"
            }, {
                status: 400
            })
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            "message": "Something went wrong",
            "type" : "Internal Server Error",
            Error: error
        }, {
            status: 500
        })
    }
}