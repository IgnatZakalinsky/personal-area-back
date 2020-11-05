import {Request, Response} from 'express'
import {ErrorType, status400, status500} from '../../../p1-common/c1-errors/errors'
import {IMapItem, MapItemType} from '../p0-models/mapItem'
import {putMapItemLogic} from '../p2-bll/putMapItemLogic'

export type AnswerType = { type: 200, updatedMapItem: IMapItem | null}
    | { type: 400 | 500, error: ErrorType}

export const putMapItem = async (req: Request, res: Response) => {
    const {mapItem} = req.body;

    if (!mapItem)
        status400(res, 'No mapItem in body! /ᐠ-ꞈ-ᐟ\\', 'putMapItem', {body: req.body})
    if (!mapItem._id)
        status400(res, 'No _id in mapItem! /ᐠ-ꞈ-ᐟ\\', 'putMapItem', {body: req.body})

    else {
        const checkedMapItem: MapItemType = {
            name: !mapItem.name ? '' : String(mapItem.name),
            type: !mapItem.type ? '' : String(mapItem.type),
            lat: (mapItem.lat === 0 || mapItem.lat === '0')
                ? 0
                : !mapItem.lat
                    ? NaN
                    : ((+mapItem.lat && mapItem.lat >= -90 && mapItem.lat <= 90) ? +mapItem.lat : NaN),
            lng: (mapItem.lng === 0 || mapItem.lng === '0')
                ? 0
                : !mapItem.lng
                    ? NaN
                    : ((+mapItem.lng && mapItem.lng >= -180 && mapItem.lng <= 180) ? +mapItem.lng : NaN),
            JSONData: !mapItem.JSONData ? '' : String(mapItem.JSONData),
        }

        putMapItemLogic(String(mapItem._id), checkedMapItem)
            .then((answer) => {
            switch (answer.type) {
                case 200: {
                    res.status(200).json({updatedPlaylist: answer.updatedMapItem})
                    break
                }
                case 500: {
                    status500(res, answer.error.e, answer.error.inTry, answer.error.more)
                    break
                }
                case 400: {
                    status400(res, answer.error.e, answer.error.inTry, answer.error.more)
                    break
                }
            }
        })
            .catch(e => status500(res, e, 'putMapItem', {body: req.body, checkedMapItem}))
    }
}
