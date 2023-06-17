import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import User, { IUser } from "@/models/User"
import { HydratedDocument } from 'mongoose';
import { connectDB } from '@/utils/database';

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

export const PATCH = async (request: NextRequest, {params}: IParams) => {
    const { username, email, role, password } = await request.json()
    const { id } = params
    if([username, email, id].some(x => !x)) {
        return NextResponse.json({
            message: "Invalid Request"
        }, {
            status: 400,
        })
    }
    
    if (role) {
        if (typeof role !== 'object' || !Object.keys(role).length) {
            return NextResponse.json({
                message: "Invalid Role"
            }, {
                status: 400,
            })
        }
    }

    try {
        await connectDB();

        const user: HydratedDocument<IUser> | null = await User.findById(id)
        if(user) {

            if(JSON.stringify({
                username,
                email,
                role: {
                    id: role.id,
                    name: role.name
                },
            }) === JSON.stringify({
                username: user.username,
                email: user.email,
                role: {
                    id: user.role.id,
                    name: user.role.name
                }
            })) {
                return NextResponse.json({
                    message: "Nothing to update"
                })
            }
            const passwordMatch:boolean = await bcrypt.compare(password, user.password);
            if(passwordMatch) {
                const updatedUser = await User.updateOne({
                    _id: id
                }, {
                    $set: {
                        username,
                        email,
                        role
                    }
                })
    
                return NextResponse.json({
                    updatedUser,
                })
            } else {
                return NextResponse.json({
                    message: "Invalid Password"
                }, {
                    status: 400
                })
            }
        }
        else {
            return NextResponse.json({
                message: "User not found"
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