import {BaseBLLType} from '../c4-bll/baseBLL'
import {Request, Response} from 'express'
import {ErrorType, status400, status500} from '../c1-errors/errors'

export const answerSwitch = (res: Response, answer: {type: 200} | {type: 400 | 500, error: ErrorType}, ok: any) => {
    switch (answer.type) {
        case 200: {
            res.status(200).json(ok)
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
}

export const baseController = (Logic: BaseBLLType, name: string) => {
    return {
        _Logic: Logic,

        async deleteItem(req: Request, res: Response) {
            const {id} = req.params

            if (!id) status400(res, 'No id in params! /ᐠ-ꞈ-ᐟ\\', 'delete' + name, {params: req.params})

            try {
                const answer = await this._Logic.deleteItem(id + '')

                answerSwitch(res, answer, answer.type === 200 && {deletedItem: answer.deletedItem})
            } catch (e) {
                status500(res, e, 'delete' + name, {params: req.params})
            }
        },
        async getItems(req: Request, res: Response, find: any, sort: any) {

            try {
                const answer = await this._Logic.getItems(find, sort)

                answerSwitch(res, answer, answer.type === 200 && {
                    items: answer.items,
                    itemsTotalCount: answer.itemsTotalCount
                })
            } catch (e) {
                status500(res, e, `get${name}s`)
            }
        },
        async addItem<T>(req: Request, res: Response, checkedItem: T) {
            try {
                const addedItem = await this._Logic.addItem(checkedItem)

                res.status(201).json({addedItem})
            } catch (e) {
                status500(res, e, `add${name}/create${name}`, {body: req.body, checkedItem})
            }
        },
        async updateItem<T>(req: Request, res: Response, id: string, checkedItem: T) {
            try {
                const answer = await this._Logic.putItem(String(id), checkedItem)

                answerSwitch(res, answer, answer.type === 200 && {updatedPlaylist: answer.updatedItem})
            } catch (e) {
                status500(res, e, 'put' + name, {body: req.body, checkedItem})
            }
        }

    }
}
