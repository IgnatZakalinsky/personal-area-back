"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDAL = void 0;
const BaseError_1 = require("../c1-errors/BaseError");
class BaseDAL {
    constructor(Model, modelName, uniqueProperties) {
        this._Model = Model;
        this.modelName = modelName;
        this.uniqueProperties = uniqueProperties;
    }
    createItem(checkedItem) {
        return this.DALPromise(() => __awaiter(this, void 0, void 0, function* () {
            yield this.checkUnique(checkedItem, '.createItem');
            return this._Model.create(checkedItem);
        }), '.createItem', { checkedItem });
    }
    readArray(find, sort, itemForPageCount = 1000, pageNumber = 1) {
        return this.DALPromise(() => {
            return this._Model.find(find)
                .sort(sort)
                .skip(itemForPageCount * (pageNumber - 1))
                .limit(itemForPageCount)
                .lean()
                .exec();
        }, '.readArray', { find, sort, itemForPageCount, pageNumber });
    }
    getItemById(id) {
        return this.DALPromise(() => {
            return this._Model.findById(id)
                .exec();
        }, '.getItemById', { id });
    }
    countItems(find) {
        return this.DALPromise(() => {
            return this._Model.count(find)
                .exec();
        }, '.countItems', { find });
    }
    removeItemById(id) {
        return this.DALPromise(() => {
            return this._Model.findByIdAndDelete(id)
                .exec();
        }, '.removeItemById', { id });
    }
    updateItemById(id, item) {
        return this.DALPromise(() => {
            return this._Model.findByIdAndUpdate(id, item, { new: true })
                .exec();
        }, '.updateItemById', { id, item });
    }
    checkUnique(checkedItem, methodName) {
        return this.DALPromise(() => __awaiter(this, void 0, void 0, function* () {
            if (this.uniqueProperties) {
                let find = {};
                for (const p of this.uniqueProperties) {
                    if (checkedItem[p]) {
                        find[p] = checkedItem[p];
                        const count = yield this.countItems(find);
                        if (count) {
                            const findKey = Object.keys(find)[0];
                            throw new BaseError_1.BaseError({
                                type: 400,
                                inTry: `DAL:${this.modelName}${methodName}.checkUnique`,
                                e: `Duplicate ${this.modelName} item property {${findKey}: ${find[findKey]}} ^._.^`,
                                more: { checkedItem, uniqueProperties: this.uniqueProperties, find, count },
                            });
                        }
                        else {
                            find = {};
                        }
                    }
                }
            }
        }), methodName + '.checkUnique', { checkedItem });
    }
    // more
    DALPromise(getAnswer, methodName, more) {
        return BaseError_1.BaseError.PromiseWithTry(`DAL:${this.modelName}`)(getAnswer, methodName, more);
    }
}
exports.BaseDAL = BaseDAL;
//# sourceMappingURL=BaseDAL-v2.js.map