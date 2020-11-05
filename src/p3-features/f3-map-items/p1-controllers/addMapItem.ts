import {Request, Response} from 'express'
import {status400, status500} from '../../../p1-common/c1-errors/errors'
import {MapItemType} from '../p0-models/mapItem'
import {addMapItemLogic} from '../p2-bll/addMapItemLogic'

export const addMapItem = async (req: Request, res: Response) => {
    const {mapItem} = req.body

    if (!mapItem)
        status400(res, 'No mapItem in body! /ᐠ-ꞈ-ᐟ\\', 'addMapItem', {body: req.body})

    else {
        const checkedMapItem: MapItemType = {
            name: !mapItem.name ? 'no Name' : String(mapItem.name),
            type: !mapItem.type ? 'no Type' : String(mapItem.type),
            lat: (mapItem.lat === 0 || mapItem.lat === '0')
                ? 0
                : !mapItem.lat
                    ? 100000
                    : (+mapItem.lat || 100000),
            lng: (mapItem.lng === 0 || mapItem.lng === '0')
                ? 0
                : !mapItem.lng
                    ? 100000
                    : (+mapItem.lng || 100000),
            JSONData: !mapItem.JSONData ? '{}' : String(mapItem.JSONData),
        }

        addMapItemLogic(checkedMapItem)
            .then(addedMapItem => {
                res.status(201).json({addedMapItem})
            })
            .catch(e => status500(res, e, 'addMapItem/createMapItem', {body: req.body, checkedMapItem}))
    }
};
