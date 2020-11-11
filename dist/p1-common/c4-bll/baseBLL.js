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
exports.baseBLL = void 0;
const debug_1 = require("../c0-debug/debug");
exports.baseBLL = (Model, name, checkUpdate) => {
    return {
        _Model: Model,
        _checkUpdate: checkUpdate,
        getItems(find, sort) {
            return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const itemsTotalCount = yield this._Model.countItems(find);
                    try {
                        const items = yield this._Model.readArray(find, sort);
                        res({ type: 200, items, itemsTotalCount });
                    }
                    catch (e) {
                        res({
                            type: 500,
                            error: { e, inTry: `get${name}s/read${name}s`, more: { find, sort, itemsTotalCount } },
                        });
                    }
                }
                catch (e) {
                    res({
                        type: 500,
                        error: { e, inTry: `get${name}s/count${name}s`, more: { find } },
                    });
                }
            }));
        },
        addItem(checkedItem) {
            return this._Model.createItem(checkedItem);
        },
        deleteItem(id) {
            return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const item = yield this._Model.getItemById(id);
                    if (!item)
                        res({
                            type: 400,
                            error: { e: name + ' id not valid /ᐠ｡ꞈ｡ᐟ\\', inTry: `delete${name}/get${name}ById`, more: { id } },
                        });
                    else {
                        try {
                            const deletedItem = yield this._Model.removeItemById(id);
                            res({ type: 200, deletedItem });
                        }
                        catch (e) {
                            res({
                                type: 500,
                                error: { e, inTry: `delete${name}/remove${name}ById`, more: { id } },
                            });
                        }
                    }
                }
                catch (e) {
                    res({
                        type: 400,
                        error: {
                            e: `may be ${name} id not valid /ᐠ｡ꞈ｡ᐟ\\`,
                            inTry: `delete${name}/get${name}ById`,
                            more: { id, error: 'some error: ' + e.message, errorObject: Object.assign({}, e) },
                        }
                    });
                }
            }));
        },
        putItem(id, item) {
            return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const oldItem = yield this._Model.getItemById(id);
                    if (!oldItem)
                        res({
                            type: 400,
                            error: {
                                e: name + ' id not valid /ᐠ｡ꞈ｡ᐟ\\',
                                inTry: `put${name}/get${name}ById`,
                                more: { id, item, oldItem },
                            }
                        });
                    else {
                        try {
                            const newItem = this._checkUpdate(item, oldItem);
                            debug_1.log(`new${name}: `, newItem);
                            const updatedItem = yield this._Model.updateItemById(id, newItem);
                            res({ type: 200, updatedItem });
                        }
                        catch (e) {
                            res({
                                type: 500,
                                error: { e, inTry: `put${name}/update${name}ById`, more: { id, item, oldItem } },
                            });
                        }
                    }
                }
                catch (e) {
                    res({
                        type: 400,
                        error: {
                            e: `may be ${name} id not valid /ᐠ｡ꞈ｡ᐟ\\`,
                            inTry: `put${name}/get${name}ById`,
                            more: { id, error: 'some error: ' + e.message, errorObject: Object.assign({}, e), item },
                        }
                    });
                }
            }));
        },
    };
};
//# sourceMappingURL=baseBLL.js.map