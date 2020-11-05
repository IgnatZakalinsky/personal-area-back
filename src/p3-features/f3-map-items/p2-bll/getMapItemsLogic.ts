import {readMapItems} from '../p3-dal/readMapItems'
import {countMapItems} from '../p3-dal/countMapItems'
import { AnswerType } from '../p1-controllers/getMapItems'

export const getMapItemsLogic = () => {
    return new Promise<AnswerType>(async res => {

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

        try {
            const mapItemsTotalCount = await countMapItems(find)

            try {
                const mapItems = await readMapItems(find, sort)
                res({type: 200, mapItems, mapItemsTotalCount})

            } catch (e) {
                res({
                    type: 500,
                    error: {e, inTry: 'getMapItems/readMapItems', more: {find, sort, mapItemsTotalCount}},
                })
            }

        } catch (e) {
            res({
                type: 500,
                error: {e, inTry: 'getMapItems/countMapItems', more: {find}},
            })
        }
    })
}
