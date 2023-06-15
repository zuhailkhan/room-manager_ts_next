import { Inventory } from "@/models/Inventory";
import { IUser } from "@/models/User";
import { PopulatedDoc, ObjectId, Document } from "mongoose";

export interface ITicket {
    ticketId: number,
    title: string,
    description: string,
    createdAt: Date,
    resolveBy: Date,
    status: boolean,
    otp: number,
    lastModifiedAt: Date,
    cost: number,
    submitterId: PopulatedDoc<Document<ObjectId> & IUser>,
    AssignedToId?: PopulatedDoc<Document<ObjectId> & IUser>,
    itemsConsumed?: Item[],
}

export interface Item {
    item: PopulatedDoc<Document<ObjectId> & Inventory>
}