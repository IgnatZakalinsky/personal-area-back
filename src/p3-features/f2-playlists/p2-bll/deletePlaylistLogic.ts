import {getPlaylistById} from '../p3-dal/getPlaylistById'
import {removePlaylistById} from '../p3-dal/removePlaylistById'
import {AnswerType} from '../p1-controllers/deletePlaylist'

export const deletePlaylistLogic = (id: string) => {
    return new Promise<AnswerType>(async res => {

        try {
            const playlist = await getPlaylistById(id)

            if (!playlist) res({
                type: 400,
                error: {e: 'playlist id not valid /ᐠ｡ꞈ｡ᐟ\\', inTry: 'deletePlaylist/getPlaylistById', more: {id}},
            })
            else {
                try {
                    const deletedPlaylist = await removePlaylistById(id)
                    res({type: 200, deletedPlaylist})

                } catch (e) {
                    res({
                        type: 500,
                        error: {e, inTry: 'deletePlaylist/removePlaylistById', more: {id}},
                    })
                }
            }
        } catch (e) {
            res({
                type: 400,
                error: {
                    e: 'may be playlist id not valid /ᐠ｡ꞈ｡ᐟ\\',
                    inTry: 'deletePlaylist/getPlaylistById',
                    more: {id, error: 'some error: ' + e.message, errorObject: {...e}},
                }
            })
        }
    })
}
