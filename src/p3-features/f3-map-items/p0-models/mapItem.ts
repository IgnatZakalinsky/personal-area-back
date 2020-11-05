import mongoose, {Schema, Document} from 'mongoose'

export interface IMapItem extends Document {
    _id: mongoose.Types.ObjectId

    name: string
    type: string
    lat: number // широта
    lng: number // долгота
    JSONData: string

    created: Date
    updated: Date

    // _doc: object // crutch
}

export type MapItemType = {
    name: string
    type: string
    lat: number // широта
    lng: number // долгота
    JSONData: string
}

// new Schema for object

const MapItem: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },

        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
        JSONData: {
            type: String,
            required: true,
        },

    },

    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    }
)

export default mongoose.model<IMapItem>('ii-test-map-item', MapItem)
