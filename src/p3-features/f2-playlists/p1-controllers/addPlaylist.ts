import {Request, Response} from 'express'
import {status400, status500} from '../../../p1-common/c1-errors/errors'
import {PlaylistType} from '../p0-models/playlist'
import {addPlaylistLogic} from '../p2-bll/addPlaylistLogic'

export const addPlaylist = async (req: Request, res: Response) => {
    const {playlist} = req.body

    if (!playlist)
        status400(res, 'No playlist in body! /ᐠ-ꞈ-ᐟ\\', 'addPlaylist', {body: req.body})

    else {
        const checkedPlaylist: PlaylistType = {
            name: !playlist.name ? 'no Name' : String(playlist.name),
            levelAccess: (playlist.levelAccess === 0 || playlist.levelAccess === '0')
                ? 0
                : !playlist.levelAccess
                    ? 100000
                    : (+playlist.levelAccess || 100000),
            tags: (!playlist.tags || playlist.tags.constructor !== Array)
                ? []
                : playlist.tags.map((t: any) => String(t)),

        }

        addPlaylistLogic(checkedPlaylist)
            .then(addedPlaylist => {
                res.status(201).json({addedPlaylist})
            })
            .catch(e => status500(res, e, 'addPlaylist/createPlaylist', {body: req.body, checkedPlaylist}))
    }
};
