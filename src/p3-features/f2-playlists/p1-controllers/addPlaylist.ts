import {Request, Response} from 'express'
import {status400} from '../../../p1-common/c1-errors/errors'
import {PlaylistController} from './index'
import {Checker} from '../../../p1-common/c2-validators/Checker'

export const addPlaylist = async (req: Request, res: Response) => {
    const {playlist} = req.body

    if (!playlist)
        status400(res, 'No playlist in body! /ᐠ-ꞈ-ᐟ\\', 'addPlaylist', {body: req.body})

    else {
        const checkedPlaylist = {
            name: Checker.string(playlist.name, 'no Name'),
            levelAccess: Checker.number(playlist.levelAccess, 100000),
            tags: Checker.arrayString(playlist.tags, []),
        }

        PlaylistController.addItem(req, res, checkedPlaylist)
    }
};
