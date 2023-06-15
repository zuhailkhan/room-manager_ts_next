import { Schema, Document, model, models} from 'mongoose'
import { IPerson } from '@/interfaces/Person'

interface IUser extends IPerson, Document {}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: Object,
        default: { 
            id: 1, 
            name: 'user' 
        } 
    },
},{
    collection: 'users'
})

export default models.User || model<IUser>('User', userSchema)

export type { IUser }