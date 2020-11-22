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
exports.PlaylistController = void 0;
const p2_bll_1 = require("../p2-bll");
const BaseError_1 = require("../../../p1-common/c1-errors/BaseError");
exports.PlaylistController = {
    addItem(req, res, checkedPlaylist) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedItem = yield p2_bll_1.PlaylistLogic.addItem(checkedPlaylist);
                res.status(201).json({ ['new' + p2_bll_1.PlaylistLogic._DAL.modelName]: addedItem });
            }
            catch (e) {
                if (e instanceof BaseError_1.BaseError) {
                    e.send(res);
                }
                else {
                    new BaseError_1.BaseError({ type: 500, inTry: 'addItem', e, more: { checkedPlaylist } })
                        .send(res);
                }
            }
        });
    }
};
//# sourceMappingURL=index.js.map