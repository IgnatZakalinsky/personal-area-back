import {Request, Response} from 'express'
import {ErrorType, status400, status500} from '../../../p1-common/c1-errors/errors'
import {deleteMapItemLogic} from '../p2-bll/deleteMapItemLogic'
import {IMapItem} from '../p0-models/mapItem'

export type AnswerType = { type: 200, deletedMapItem: IMapItem | null}
    | { type: 400 | 500, error: ErrorType}

export const deleteMapItem = async (req: Request, res: Response) => {
    const {id} = req.params

    if (!id) status400(res, 'No id in params! /ᐠ-ꞈ-ᐟ\\', 'deleteMapItem', {params: req.params})

    deleteMapItemLogic(id + '')
        .then((answer) => {
            switch (answer.type) {
                case 200: {
                    res.status(200).json({deletedMapItem: answer.deletedMapItem})
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
        .catch(e => status500(res, e, 'deleteMapItem', {params: req.params}))
}
