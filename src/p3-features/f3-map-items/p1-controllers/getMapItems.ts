import {Request, Response} from 'express'
import {getMapItemsLogic} from '../p2-bll/getMapItemsLogic'
import {ErrorType, status400, status500} from '../../../p1-common/c1-errors/errors'
import {IMapItem} from "../p0-models/mapItem";

export type AnswerType = {
    type: 200,
    mapItems: Pick<IMapItem, "_id" | "name" | "type" | "lng" | "lat" | "JSONData">[],
    mapItemsTotalCount: number
} | { type: 400 | 500, error: ErrorType }

export const getMapItems = (req: Request, res: Response) => {

    getMapItemsLogic()
        .then(answer => {
            switch (answer.type) {
                case 200: {
                    res.status(200).json({
                        mapItems: answer.mapItems,
                        mapItemsTotalCount: answer.mapItemsTotalCount
                    })
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
        .catch(e => status500(res, e, 'getMapItems'))
}
