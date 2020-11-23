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
exports.BaseController = void 0;
const BaseError_1 = require("../c1-errors/BaseError");
class BaseController {
    constructor(BLL) {
        this._BLL = BLL;
    }
    addItem(req, res, checkedItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const addedItem = yield this.ControllerPromise(res, () => {
                return this._BLL.addItem(checkedItem);
            }, '.addItem', { checkedItem });
            res.status(201).json({ ['new' + this._BLL._DAL.modelName]: addedItem });
        });
    }
    ControllerPromise(res, getAnswer, methodName, more) {
        return BaseError_1.BaseError.PromiseWithTryAndSend(`Controller:${this._BLL._DAL.modelName}`)(res, getAnswer, methodName, more);
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController-v2.js.map