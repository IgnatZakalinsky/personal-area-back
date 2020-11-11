import {BaseDALType} from '../c5-dal/baseDAL'
import {ErrorType} from '../c1-errors/errors'
import {log} from '../c0-debug/debug'

export type BaseBLLType = ReturnType<typeof baseBLL>

export const baseBLL = (Model: BaseDALType, name: string, checkUpdate: (item: any, oldItem: any) => any) => {

    return {
        _Model: Model,
        _checkUpdate: checkUpdate,

        getItems(find: any, sort: any) {
            type AnswerType = { type: 200, items: any[], itemsTotalCount: number }
                | { type: 400 | 500, error: ErrorType }

            return new Promise<AnswerType>(async res => {
                try {
                    const itemsTotalCount = await this._Model.countItems(find)

                    try {
                        const items = await this._Model.readArray(find, sort)
                        res({type: 200, items, itemsTotalCount})

                    } catch (e) {
                        res({
                            type: 500,
                            error: {e, inTry: `get${name}s/read${name}s`, more: {find, sort, itemsTotalCount}},
                        })
                    }

                } catch (e) {
                    res({
                        type: 500,
                        error: {e, inTry: `get${name}s/count${name}s`, more: {find}},
                    })
                }
            })
        },
        addItem<T>(checkedItem: T) {
            return this._Model.createItem(checkedItem)
        },
        deleteItem(id: string) {
            type AnswerType = { type: 200, deletedItem: any | null }
                | { type: 400 | 500, error: ErrorType }

            return new Promise<AnswerType>(async res => {

                try {
                    const item = await this._Model.getItemById(id)

                    if (!item) res({
                        type: 400,
                        error: {e: name + ' id not valid /ᐠ｡ꞈ｡ᐟ\\', inTry: `delete${name}/get${name}ById`, more: {id}},
                    })
                    else {
                        try {
                            const deletedItem = await this._Model.removeItemById(id)
                            res({type: 200, deletedItem})

                        } catch (e) {
                            res({
                                type: 500,
                                error: {e, inTry: `delete${name}/remove${name}ById`, more: {id}},
                            })
                        }
                    }
                } catch (e) {
                    res({
                        type: 400,
                        error: {
                            e: `may be ${name} id not valid /ᐠ｡ꞈ｡ᐟ\\`,
                            inTry: `delete${name}/get${name}ById`,
                            more: {id, error: 'some error: ' + e.message, errorObject: {...e}},
                        }
                    })
                }
            })
        },
        putItem<T>(id: string, item: T) {
            type AnswerType = { type: 200, updatedItem: any | null }
                | { type: 400 | 500, error: ErrorType }

            return new Promise<AnswerType>(async res => {

                try {
                    const oldItem = await this._Model.getItemById(id)

                    if (!oldItem) res({
                        type: 400,
                        error: {
                            e: name + ' id not valid /ᐠ｡ꞈ｡ᐟ\\',
                            inTry: `put${name}/get${name}ById`,
                            more: {id, item, oldItem},
                        }
                    })
                    else {
                        try {
                            const newItem = this._checkUpdate(item, oldItem)
                            log(`new${name}: `, newItem)

                            const updatedItem = await this._Model.updateItemById(id, newItem)
                            res({type: 200, updatedItem})

                        } catch (e) {
                            res({
                                type: 500,
                                error: {e, inTry: `put${name}/update${name}ById`, more: {id, item, oldItem}},
                            })
                        }
                    }
                } catch (e) {
                    res({
                        type: 400,
                        error: {
                            e: `may be ${name} id not valid /ᐠ｡ꞈ｡ᐟ\\`,
                            inTry: `put${name}/get${name}ById`,
                            more: {id, error: 'some error: ' + e.message, errorObject: {...e}, item},
                        }
                    })
                }
            })
        },

    }
}
