import {BaseDAL} from '../../../p1-common/c5-dal/BaseDAL-v2'
import Playlist, {IPlaylist, uniqueProperties} from '../p0-models/PlaylistModel'

export const PlaylistModel = new BaseDAL<IPlaylist>(Playlist, 'Playlist', uniqueProperties)
