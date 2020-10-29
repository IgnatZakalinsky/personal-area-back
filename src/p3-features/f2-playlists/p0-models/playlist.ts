import mongoose, {Schema, Document} from 'mongoose'

export const PLAYLIST_TAG = {
    TODOLIST: 'todolist',

}

export interface IPlaylist extends Document {
    _id: mongoose.Types.ObjectId

    name: string
    levelAccess: number
    tags: string[]
    // position number
    // start/end date access

    created: Date
    updated: Date

    // _doc: object // crutch
}

export type PlaylistType = {
    name: string
    levelAccess: number
    tags: string[]
}

const Playlist: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        levelAccess: {
            type: Number,
            required: true,
        },

        tags: [{
            type: String,
        }],

    },

    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    }
)

export default mongoose.model<IPlaylist>('ii-test-playlist', Playlist)
