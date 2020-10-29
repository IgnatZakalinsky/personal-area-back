import {PlaylistType} from '../p0-models/playlist'
import {createPlaylist} from '../p3-dal/createPlaylist'

export const addPlaylistLogic = (checkedPlaylist: PlaylistType) => {
    return createPlaylist(checkedPlaylist)
}
