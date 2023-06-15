import { Schema, Document, model, models } from 'mongoose';
import { ITicket } from '@/interfaces/Ticket';

interface Ticket extends ITicket, Document {}

const ticketSchema: Schema = new Schema({
    submitterId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    AssignedToId: {
        type: Schema.Types.ObjectId,
        ref: 'Worker'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    resolveBy: {
        type: Date,
    },
    status: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: Number,
    },
    lastModifiedAt: {
        type: Date,
    },
    cost: {
        type: Number,
    },
}, {
    collection: 'tickets'
})

export default models.Ticket || model<Ticket>('Ticket', ticketSchema)

export type { Ticket }
