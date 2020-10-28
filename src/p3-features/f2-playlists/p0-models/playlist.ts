import mongoose, {Schema, Document} from 'mongoose'

export const PLAYLIST_TAG = {
    TODOLIST: 'todolist',

}

export interface IPlaylist extends Document {
    _id: mongoose.Types.ObjectId

    levelAccess: number
    tags: string[]
    // position number
    // start/end date access

    created: Date
    updated: Date

    // _doc: object // crutch
}

const Playlist: Schema = new Schema(
    {
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
