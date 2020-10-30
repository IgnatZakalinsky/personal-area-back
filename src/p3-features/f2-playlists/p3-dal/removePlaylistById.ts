import Playlist from '../p0-models/playlist'

export const removePlaylistById = (id: string) => {

    return Playlist.findByIdAndDelete(id)
        .exec()
}
