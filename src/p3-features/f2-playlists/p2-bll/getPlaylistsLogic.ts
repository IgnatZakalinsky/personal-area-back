import {readPlaylists} from '../p3-dal/readPlaylists'
import {countPlaylists} from '../p3-dal/countPlaylists'
import { AnswerType } from '../p1-controllers/getPlaylist'

export const getPlaylistsLogic = () => {
    return new Promise<AnswerType>(async res => {

        // const sortName: string = (sortPacksF && sortPacksF.length > 2) ? sortPacksF.slice(1) : ''
        const sortName: string = ''
        // const direction = sortName ? (sortPacksF[0] === '0' ? -1 : 1) : undefined
        const direction = undefined
        const sort = sortName ? {[sortName]: direction} : {updated: -1}

        const findBase = {
            name: new RegExp('', 'gi'),
            // cardsCount: {$gte: min && +min || minF, $lte: max && +max || maxF},
        };
        // const findPrivate = user_idF && user._id.equals(user_idF) ? {} : {private: false}
        // const findByUserId = user_id ? {user_id: user_idF} : {}

        const find = {
            // ...findByUserId,
            ...findBase,
            // ...findPrivate,
        }

        try {
            const playlistsTotalCount = await countPlaylists(find)

            try {
                const playlists = await readPlaylists(find, sort)
                res({type: 200, playlists, playlistsTotalCount})

            } catch (e) {
                res({
                    type: 500,
                    error: {e, inTry: 'getPlaylists/readPlaylists', more: {find, sort, playlistsTotalCount}},
                })
            }

        } catch (e) {
            res({
                type: 500,
                error: {e, inTry: 'getPlaylists/countPlaylists', more: {find}},
            })
        }
    })
}
