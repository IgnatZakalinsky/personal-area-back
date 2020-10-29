import {Request, Response} from 'express'
import {getPlaylistsLogic} from '../p2-bll/getPlaylistsLogic'
import {status500} from '../../../p1-common/c1-errors/errors'

export const getPlaylists = (req: Request, res: Response) => {

    getPlaylistsLogic()
        .then(answer => {
            res.status(200).json(answer)
        })
        .catch(e => status500(res, e, 'getPlaylists/Playlist.find'))
}
