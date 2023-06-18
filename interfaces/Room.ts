import { IUser } from '@/models/User';
import { Document, ObjectId, PopulatedDoc } from 'mongoose'

export interface Room {
    roomno: string,
    tier: string,
    status: string,
    occupiedBy: PopulatedDoc<Document<ObjectId> & IUser> | null, 
    lastUpdatedAt?: Date,
    expiresAt?: Date,
}