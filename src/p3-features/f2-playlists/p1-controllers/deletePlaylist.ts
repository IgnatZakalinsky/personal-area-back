import {Request, Response} from 'express'
import {ErrorType, status400, status500} from '../../../p1-common/c1-errors/errors'
import {deletePlaylistLogic} from '../p2-bll/deletePlaylistLogic'
import {IPlaylist} from '../p0-models/playlist'

export type AnswerType = { type: 200, deletedPlaylist: IPlaylist | null}
    | { type: 400 | 500, error: ErrorType}

export const deletePlaylist = async (req: Request, res: Response) => {
    const {id} = req.params

    if (!id) status400(res, 'No id in params! /ᐠ-ꞈ-ᐟ\\', 'deletePlaylist', {params: req.params})

    deletePlaylistLogic(id + '')
        .then((answer) => {
            switch (answer.type) {
                case 200: {
                    res.status(200).json({deletedPlaylist: answer.deletedPlaylist})
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
        .catch(e => status500(res, e, 'deletePlaylist', {params: req.params}))
}
