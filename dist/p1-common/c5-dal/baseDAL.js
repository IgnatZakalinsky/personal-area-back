"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseDAL = void 0;
exports.baseDAL = (Model) => {
    return {
        _Model: Model,
        readArray(find, sort, itemForPageCount = 1000, pageNumber = 1) {
            return this._Model.find(find)
                .sort(sort)
                .skip(itemForPageCount * (pageNumber - 1))
                .limit(itemForPageCount)
                .lean()
                .exec();
        },
        createItem(checkedItem) {
            return this._Model.create(Object.assign(Object.assign({}, checkedItem), { created: new Date(), updated: new Date() }));
        },
        getItemById(id) {
            return this._Model.findById(id)
                .exec();
        },
        countItems(find) {
            return this._Model.count(find)
                .exec();
        },
        removeItemById(id) {
            return this._Model.findByIdAndDelete(id)
                .exec();
        },
        updateItemById(id, item) {
            return this._Model.findByIdAndUpdate(id, item, { new: true })
                .exec();
        },
    };
};
//# sourceMappingURL=baseDAL.js.map