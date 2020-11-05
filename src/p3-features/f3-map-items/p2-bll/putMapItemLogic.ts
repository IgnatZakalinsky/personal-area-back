import {getMapItemById} from '../p3-dal/getMapItemById'
import {MapItemType} from '../p0-models/mapItem'
import {AnswerType} from '../p1-controllers/putMapItem'
import {updateMapItemById} from '../p3-dal/updateMapItemById'
import {log} from '../../../p1-common/c0-debug/debug'

export const putMapItemLogic = (id: string, mapItem: MapItemType) => {
    return new Promise<AnswerType>(async res => {

        try {
            const oldMapItem = await getMapItemById(id)

            if (!oldMapItem) res({
                type: 400,
                error: {
                    e: 'mapItem id not valid /ᐠ｡ꞈ｡ᐟ\\',
                    inTry: 'putMapItem/getMapItemById',
                    more: {id, mapItem, oldMapItem},
                }
            })
            else {
                try {
                    const newMapItem: MapItemType = {
                        name: !mapItem.name ? oldMapItem.name : mapItem.name,
                        type: !mapItem.type ? oldMapItem.type : mapItem.type,
                        lat: (mapItem.lat === 0)
                            ? 0
                            : !mapItem.lat
                                ? oldMapItem.lat
                                : mapItem.lat,
                        lng: (mapItem.lng === 0)
                            ? 0
                            : !mapItem.lng
                                ? oldMapItem.lng
                                : mapItem.lng,
                        JSONData: !mapItem.JSONData ? oldMapItem.JSONData : mapItem.JSONData,
                    }
                    log('newMapItem: ', newMapItem)

                    const updatedMapItem = await updateMapItemById(id, newMapItem)
                    res({type: 200, updatedMapItem})

                } catch (e) {
                    res({
                        type: 500,
                        error: {e, inTry: 'putMapItem/updateMapItemById', more: {id, mapItem, oldMapItem}},
                    })
                }
            }
        } catch (e) {
            res({
                type: 400,
                error: {
                    e: 'may be mapItem id not valid /ᐠ｡ꞈ｡ᐟ\\',
                    inTry: 'putMapItem/getMapItemById',
                    more: {id, error: 'some error: ' + e.message, errorObject: {...e}, mapItem},
                }
            })
        }

    })
}
