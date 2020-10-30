import {getPlaylistById} from '../p3-dal/getPlaylistById'
import {PlaylistType} from '../p0-models/playlist'
import {AnswerType} from '../p1-controllers/putPlaylist'
import {updatePlaylistById} from '../p3-dal/updatePlaylistById'
import {log} from '../../../p1-common/c0-debug/debug'

export const putPlaylistLogic = (id: string, playlist: PlaylistType) => {
    return new Promise<AnswerType>(async res => {

        try {
            const oldPlaylist = await getPlaylistById(id)

            if (!oldPlaylist) res({
                type: 400,
                error: {
                    e: 'playlist id not valid /ᐠ｡ꞈ｡ᐟ\\',
                    inTry: 'putPlaylist/getPlaylistById',
                    more: {id, playlist, oldPlaylist},
                }
            })
            else {
                try {
                    const newPlaylist: PlaylistType = {
                        name: !playlist.name ? oldPlaylist.name : playlist.name,
                        levelAccess: (playlist.levelAccess === 0)
                            ? 0
                            : !playlist.levelAccess
                                ? oldPlaylist.levelAccess
                                : playlist.levelAccess,
                        tags: playlist.tags.length > 0 && !playlist.tags[0]
                            ? oldPlaylist.tags
                            : playlist.tags,
                    }
                    log('newPlaylist: ', newPlaylist)

                    const updatedPlaylist = await updatePlaylistById(id, newPlaylist)
                    res({type: 200, updatedPlaylist})

                } catch (e) {
                    res({
                        type: 500,
                        error: {e, inTry: 'putPlaylist/updatePlaylistById', more: {id, playlist, oldPlaylist}},
                    })
                }
            }
        } catch (e) {
            res({
                type: 400,
                error: {
                    e: 'may be playlist id not valid /ᐠ｡ꞈ｡ᐟ\\',
                    inTry: 'putPlaylist/getPlaylistById',
                    more: {id, error: 'some error: ' + e.message, errorObject: {...e}, playlist},
                }
            })
        }

    })
}
