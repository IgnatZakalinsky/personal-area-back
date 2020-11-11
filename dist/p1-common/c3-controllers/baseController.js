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
exports.baseController = void 0;
const errors_1 = require("../c1-errors/errors");
exports.baseController = (Logic, name) => {
    return {
        _Logic: Logic,
        deleteItem(req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const { id } = req.params;
                if (!id)
                    errors_1.status400(res, 'No id in params! /ᐠ-ꞈ-ᐟ\\', 'delete' + name, { params: req.params });
                try {
                    // this._Logic not worked
                    const answer = yield Logic.deleteItem(id + '');
                    switch (answer.type) {
                        case 200: {
                            res.status(200).json({ deletedItem: answer.deletedItem });
                            break;
                        }
                        case 500: {
                            errors_1.status500(res, answer.error.e, answer.error.inTry, answer.error.more);
                            break;
                        }
                        case 400: {
                            errors_1.status400(res, answer.error.e, answer.error.inTry, answer.error.more);
                            break;
                        }
                    }
                }
                catch (e) {
                    errors_1.status500(res, e, 'delete' + name, { params: req.params });
                }
            });
        },
        getItems(req, res, find, sort) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const answer = yield Logic.getItems(find, sort);
                    switch (answer.type) {
                        case 200: {
                            res.status(200).json({
                                items: answer.items,
                                itemsTotalCount: answer.itemsTotalCount
                            });
                            break;
                        }
                        case 500: {
                            errors_1.status500(res, answer.error.e, answer.error.inTry, answer.error.more);
                            break;
                        }
                        case 400: {
                            errors_1.status400(res, answer.error.e, answer.error.inTry, answer.error.more);
                            break;
                        }
                    }
                }
                catch (e) {
                    errors_1.status500(res, e, `get${name}s`);
                }
            });
        },
        addItem(req, res, checkedItem) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const addedItem = yield Logic.addItem(checkedItem);
                    res.status(201).json({ addedItem });
                }
                catch (e) {
                    errors_1.status500(res, e, `add${name}/create${name}`, { body: req.body, checkedItem });
                }
            });
        },
        updateItem(req, res, id, checkedItem) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const answer = yield Logic.putItem(String(id), checkedItem);
                    switch (answer.type) {
                        case 200: {
                            res.status(200).json({ updatedPlaylist: answer.updatedItem });
                            break;
                        }
                        case 500: {
                            errors_1.status500(res, answer.error.e, answer.error.inTry, answer.error.more);
                            break;
                        }
                        case 400: {
                            errors_1.status400(res, answer.error.e, answer.error.inTry, answer.error.more);
                            break;
                        }
                    }
                }
                catch (e) {
                    errors_1.status500(res, e, 'put' + name, { body: req.body, checkedItem });
                }
            });
        }
    };
};
//# sourceMappingURL=baseController.js.map