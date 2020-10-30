import {Request, Response} from 'express'
import {getPlaylistsLogic} from '../p2-bll/getPlaylistsLogic'
import {ErrorType, status400, status500} from '../../../p1-common/c1-errors/errors'
import {IPlaylist} from '../p0-models/playlist'

export type AnswerType = {
        type: 200,
        playlists: Pick<IPlaylist, "_id" | "name" | "levelAccess" | "tags" | "created" | "updated">[],
        playlistsTotalCount: number
    } | { type: 400 | 500, error: ErrorType }

export const getPlaylists = (req: Request, res: Response) => {

    getPlaylistsLogic()
        .then(answer => {
            switch (answer.type) {
                case 200: {
                    res.status(200).json({
                        playlists: answer.playlists,
                        playlistsTotalCount: answer.playlistsTotalCount
                    })
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
        .catch(e => status500(res, e, 'getPlaylists'))
}
