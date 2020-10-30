import Playlist, {PlaylistType} from '../p0-models/playlist'

export const updatePlaylistById = (id: string, playlist: PlaylistType) => {

    return Playlist.findByIdAndUpdate(id, playlist, {new: true})
        .exec()
}
