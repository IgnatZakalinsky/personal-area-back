import {Request, Response} from 'express'
import {PlaylistLogic} from '../p2-bll'
import {BaseError} from '../../../p1-common/c1-errors/BaseError'
import {BaseCreateQueryType} from "../../../p1-common/c5-dal/BaseDAL-v2";
import {IPlaylist} from "../p0-models/PlaylistModel";

export const PlaylistController = {
    async addItem(req: Request, res: Response, checkedPlaylist: BaseCreateQueryType<IPlaylist>) {
        try {
            const addedItem = await PlaylistLogic.addItem(checkedPlaylist)

            res.status(201).json({['new' + PlaylistLogic._DAL.modelName]: addedItem})
        } catch (e) {
            if (e instanceof BaseError) {
                e.send(res)

            } else {
                new BaseError({type: 500, inTry: 'addItem', e, more: {checkedPlaylist}})
                    .send(res)
            }
        }

    }
}
