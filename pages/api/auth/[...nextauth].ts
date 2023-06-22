import bcrypt from 'bcryptjs';
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User, { IUser } from "@/models/User";
import { connectDB } from "@/utils/database";
import { HydratedDocument } from "mongoose";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'basic',
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { username, password } = credentials as { username: string, password: string }
                try {
                    await connectDB();

                    const user: HydratedDocument<IUser> | null = await User.findOne({ username })
                    if (user) {
                        const match: boolean = await bcrypt.compare(password, user.password)
                        if (match) {
                            return user as any
                        } else {
                            throw new Error('Wrong password')
                        }
                    } else {
                        throw new Error('User does not exist')
                    }
                } catch (error) {
                    throw error
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    }
}

export default NextAuth(authOptions)
