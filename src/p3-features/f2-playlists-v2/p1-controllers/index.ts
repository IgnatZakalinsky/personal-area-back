import {PlaylistLogic} from '../p2-bll'
import {BaseController} from '../../../p1-common/c3-controllers/BaseController-v2'
import {Request, Response} from 'express'
import {BaseError} from '../../../p1-common/c1-errors/BaseError'
import {PlaylistType} from '../p0-models/PlaylistModel'
import {Validators} from '../../../p1-common/c2-validators/Validators'

export const PlaylistController = new BaseController(PlaylistLogic)

export const addPlaylist = async (req: Request, res: Response) => {
    const {playlist} = req.body

    const inTry = 'PreController:Playlist.addPlaylist.'

    if (!playlist) {
        new BaseError({
            type: 400,
            e: 'No playlist in body! /ᐠ-ꞈ-ᐟ\\',
            inTry: inTry + 'playlist',
            more: {body: req.body},
        })
            .send(res)
    } else {
        await PlaylistController.ControllerPromise<void>(
            res,
            async () => {
                const checkedPlaylist: PlaylistType = {
                    name: Validators.string(
                        playlist.name,
                        'no Name',
                        'no Name',
                        inTry + 'checkedPlaylist[name]'
                    ),
                    levelAccess: Validators.number(
                        playlist.levelAccess,
                        100000,
                        inTry + 'checkedPlaylist[levelAccess]'
                    ),
                    tags: Validators.array<[], string>(
                        playlist.tags,
                        [],
                        'string',
                        inTry + 'checkedPlaylist[tags]'
                    ),
                }

                await PlaylistController.addItem(
                    req,
                    res,
                    {
                        ...checkedPlaylist,
                        updated: new Date(),
                        created: new Date(),
                    })
            },
            inTry + 'checkedPlaylist',
            {playlist},
        )


    }
}
