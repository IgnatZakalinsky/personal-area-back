import {Request, Response} from 'express'
import {PlaylistController} from './index'

export const getPlaylists = (req: Request, res: Response) => {
    // const sortName: string = (sortPacksF && sortPacksF.length > 2) ? sortPacksF.slice(1) : ''
    const sortName: string = ''
    // const direction = sortName ? (sortPacksF[0] === '0' ? -1 : 1) : undefined
    const direction = undefined
    const sort = sortName ? {[sortName]: direction} : {updated: -1}

    const findBase = {
        name: new RegExp('', 'gi'),
        // cardsCount: {$gte: min && +min || minF, $lte: max && +max || maxF},
    };
    // const findPrivate = user_idF && user._id.equals(user_idF) ? {} : {private: false}
    // const findByUserId = user_id ? {user_id: user_idF} : {}

    const find = {
        // ...findByUserId,
        ...findBase,
        // ...findPrivate,
    }

    PlaylistController.getItems(req, res, find, sort)
}
