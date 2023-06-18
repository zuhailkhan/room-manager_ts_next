import { Room } from "@/interfaces/Room";
import { Schema, Document, model, models } from 'mongoose'

export interface IRoom extends Room,Document {}

const roomSchema = new Schema({
    roomno: {
        type: String,
    },
    tier: {
        type: String,
    },
    status: {
        type: Boolean,
    },
    occupiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lastUpdatedAt: {
        type: Date,
        default: new Date()
    },
    expiresAt: {
        type: Date,
    }
    // history of tickets from room?
}, {
    collection: 'rooms'
})

export default models.Room || model<IRoom>('Room', roomSchema)
