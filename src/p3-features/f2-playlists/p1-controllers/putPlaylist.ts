import {Request, Response} from 'express'
import {ErrorType, status400, status500} from '../../../p1-common/c1-errors/errors'
import {IPlaylist, PlaylistType} from '../p0-models/playlist'
import {putPlaylistLogic} from '../p2-bll/putPlaylistLogic'

export type AnswerType = { type: 200, updatedPlaylist: IPlaylist | null}
    | { type: 400 | 500, error: ErrorType}

export const putPlaylist = async (req: Request, res: Response) => {
    const {playlist} = req.body;

    if (!playlist)
        status400(res, 'No playlist in body! /ᐠ-ꞈ-ᐟ\\', 'putPlaylist', {body: req.body})
    if (!playlist._id)
        status400(res, 'No _id in playlist! /ᐠ-ꞈ-ᐟ\\', 'putPlaylist', {body: req.body})

    else {
        const checkedPlaylist: PlaylistType = {
            name: !playlist.name ? '' : String(playlist.name),
            levelAccess: (playlist.levelAccess === 0 || playlist.levelAccess === '0')
                ? 0
                : !playlist.levelAccess
                    ? NaN
                    : (+playlist.levelAccess || NaN),
            tags: (!playlist.tags || playlist.tags.constructor !== Array)
                ? [''] // нельзя добавлять '' тег
                : playlist.tags.map((t: any) => String(t)),

        }

        putPlaylistLogic(String(playlist._id), checkedPlaylist)
            .then((answer) => {
            switch (answer.type) {
                case 200: {
                    res.status(200).json({updatedPlaylist: answer.updatedPlaylist})
                    break
                }
                case 500: {
                    status500(res, answer.error.e, answer.error.inTry, answer.error.more)
                    break
                }
                case 400: {
                    status400(res, answer.error.e, answer.error.inTry, answer.error.more)
                    break
                }
            }
        })
            .catch(e => status500(res, e, 'putPlaylist', {body: req.body, checkedPlaylist}))
    }
}
