import User, { IUser } from "@/models/User"
import { connectDB } from "@/utils/database"
import bcrypt from 'bcryptjs'
export const POST = async (request: Request) => {
    const { username, email, password } = await request.json()
    if([username, email, password].some((value) => !value)) {
        return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 })
    }
    try {
        await connectDB()
        const userExists = await User.count( { username } )
        console.log(userExists)
        if(!userExists) {
            bcrypt.hash(password, 10, (err, result) => {
                if (err) {
                    throw new Error("Something went wrong")
                }
                else if (result) {
                    const newUser = new User({ username, email, password: result })
                    newUser.save()

                    return
                }
            })
            return new Response(JSON.stringify({message: "User created"}), { status: 200 })
        } else {
            return new Response(JSON.stringify({error: "User already exists"}), { status: 400 })
        }
        
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify(error), { status: 500 })
    }
}