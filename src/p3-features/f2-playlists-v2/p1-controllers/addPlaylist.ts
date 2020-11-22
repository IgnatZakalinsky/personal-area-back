import {Request, Response} from 'express'
import {BaseError} from '../../../p1-common/c1-errors/BaseError'
import {PlaylistType} from '../p0-models/PlaylistModel'
import {Validators} from '../../../p1-common/c2-validators/Validators'
import {PlaylistController} from './index'

export const addPlaylist = async (req: Request, res: Response) => {
    const {playlist} = req.body

    if (!playlist) {
        new BaseError({type: 400, e: 'No playlist in body! /ᐠ-ꞈ-ᐟ\\', inTry: 'addPlaylist', more: {body: req.body}})
            .send(res)
    } else {
        const checkedPlaylist: PlaylistType = {
            name: Validators.string(playlist.name, 'no Name'),
            levelAccess: Validators.number(playlist.levelAccess, 100000),
            tags: Validators.array<[], string>(playlist.tags, [], 'string'),
        }


        await PlaylistController.addItem(
            req,
            res,
            {
                ...checkedPlaylist,
                updated: new Date(),
                created: new Date(),
            })
    }
};
