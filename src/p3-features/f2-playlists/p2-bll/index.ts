import {baseBLL} from '../../../p1-common/c4-bll/baseBLL'
import {Playlists} from '../p3-dal'
import {PlaylistType} from '../p0-models/playlist'
import {Updater} from '../../../p1-common/c2-validators/Updater'

const checkUpdate = (item: PlaylistType, oldItem: PlaylistType): PlaylistType => {
    return {
        name: Updater.string(item.name, oldItem.name),
        levelAccess: Updater.number(item.levelAccess, oldItem.levelAccess),
        tags: Updater.arrayString(item.tags, oldItem.tags),
    }
}

export const PlaylistLogic = baseBLL(Playlists, 'Playlist', checkUpdate)


