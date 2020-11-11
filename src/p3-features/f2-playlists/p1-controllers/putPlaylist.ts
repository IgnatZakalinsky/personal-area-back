import {Request, Response} from 'express'
import {status400} from '../../../p1-common/c1-errors/errors'
import {PlaylistController} from './index';
import {Checker} from '../../../p1-common/c2-validators/Checker'

export const putPlaylist = async (req: Request, res: Response) => {
    const {playlist} = req.body;

    if (!playlist)
        status400(res, 'No playlist in body! /ᐠ-ꞈ-ᐟ\\', 'putPlaylist', {body: req.body})
    if (!playlist._id)
        status400(res, 'No _id in playlist! /ᐠ-ꞈ-ᐟ\\', 'putPlaylist', {body: req.body})

    else {
        const checkedPlaylist = {
            name: Checker.string(playlist.name, undefined),
            levelAccess: Checker.number(playlist.levelAccess, NaN),
            tags: Checker.arrayString(playlist.tags, ['']),
        }

        PlaylistController.updateItem(req, res, playlist._id, checkedPlaylist)
    }
}
