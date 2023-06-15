import { Schema, Document, model, models, PopulatedDoc, ObjectId } from 'mongoose';
import { ITicket } from '@/interfaces/Ticket';
import { randomUUID } from 'crypto';

interface Ticket extends ITicket, Document {}

const ticketSchema: Schema = new Schema({
    ticketId: {
        type: Number,
        default: () => randomUUID()
    },
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
    itemsConsumed: {
        type: Array,
    }
}, {
    collection: 'tickets'
})

export default models.Ticket || model<Ticket>('Ticket', ticketSchema)

export type { Ticket }
