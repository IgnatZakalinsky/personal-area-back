import Playlist from '../p0-models/playlist'

export const countPlaylists = (find: any) => {

    return Playlist.count(find)
        .exec()
}
