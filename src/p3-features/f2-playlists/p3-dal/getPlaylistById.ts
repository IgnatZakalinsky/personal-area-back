import Playlist from '../p0-models/playlist'

export const getPlaylistById = (id: string) => {

    return Playlist.findById(id)
        .exec()
}
