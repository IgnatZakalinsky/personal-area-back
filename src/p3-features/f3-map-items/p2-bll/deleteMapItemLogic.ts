import {getMapItemById} from '../p3-dal/getMapItemById'
import {removeMapItemById} from '../p3-dal/removeMapItemById'
import {AnswerType} from '../p1-controllers/deleteMapItem'

export const deleteMapItemLogic = (id: string) => {
    return new Promise<AnswerType>(async res => {

        try {
            const mapItem = await getMapItemById(id)

            if (!mapItem) res({
                type: 400,
                error: {e: 'mapItem id not valid /ᐠ｡ꞈ｡ᐟ\\', inTry: 'deleteMapItem/getMapItemById', more: {id}},
            })
            else {
                try {
                    const deletedMapItem = await removeMapItemById(id)
                    res({type: 200, deletedMapItem})

                } catch (e) {
                    res({
                        type: 500,
                        error: {e, inTry: 'deleteMapItem/removeMapItemById', more: {id}},
                    })
                }
            }
        } catch (e) {
            res({
                type: 400,
                error: {
                    e: 'may be mapItem id not valid /ᐠ｡ꞈ｡ᐟ\\',
                    inTry: 'deleteMapItem/getMapItemById',
                    more: {id, error: 'some error: ' + e.message, errorObject: {...e}},
                }
            })
        }
    })
}
