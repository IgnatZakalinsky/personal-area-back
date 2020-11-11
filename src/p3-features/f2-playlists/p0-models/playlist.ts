import mongoose, {Schema, Document, Model} from 'mongoose'

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

// new Schema for object

const PlaylistSchema: Schema = new Schema(
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
            // type: [String],
        }],

    },

    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated',
        },
    }
)

export const Playlist: Model<IPlaylist> = mongoose.model<IPlaylist>('ii-test-playlist', PlaylistSchema)

export default Playlist
