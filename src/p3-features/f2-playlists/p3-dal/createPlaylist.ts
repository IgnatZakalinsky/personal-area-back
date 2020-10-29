import {PlaylistType} from '../p0-models/playlist'
import Playlist from '../p0-models/playlist'

export const createPlaylist = (checkedPlaylist: PlaylistType) => {
    return Playlist.create({
        ...checkedPlaylist,
        created: new Date(),
        updated: new Date(),
    })
}
