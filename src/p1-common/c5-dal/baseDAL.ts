import {Model, Document, CreateQuery} from 'mongoose'

export type BaseDALType = ReturnType<typeof baseDAL>

export const baseDAL = <T extends Document>(Model: Model<T>) => {
    return {
        _Model: Model,

        readArray(find: any, sort: any, itemForPageCount = 1000, pageNumber = 1) {

            return this._Model.find(find)
                .sort(sort)
                .skip(itemForPageCount * (pageNumber - 1))
                .limit(itemForPageCount)
                .lean()
                .exec()
        },
        createItem(checkedItem: CreateQuery<T>) {
            return this._Model.create({
                ...checkedItem,
                created: new Date(),
                updated: new Date(),
            })
        },
        getItemById(id: string) {

            return this._Model.findById(id)
                .exec()
        },
        countItems(find: any) {

            return this._Model.count(find)
                .exec()
        },
        removeItemById(id: string) {

            return this._Model.findByIdAndDelete(id)
                .exec()
        },
        updateItemById(id: string, item: CreateQuery<T>) {

            return this._Model.findByIdAndUpdate(id, item, {new: true})
                .exec()
        },

    }
}
