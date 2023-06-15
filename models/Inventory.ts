import { Schema, Document, model, models } from 'mongoose'
import { IInventory } from '@/interfaces/Inventory'

export interface Inventory extends IInventory, Document {}

const invSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    }
}, {
    collection: 'Inventory'
})

export default models.Inventory || model<Inventory>('Inventory', invSchema)