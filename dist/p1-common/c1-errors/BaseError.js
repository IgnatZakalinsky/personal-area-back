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
exports.BaseError = void 0;
class BaseError {
    constructor(error) {
        this.type = error.type;
        this.e = error.e;
        this.inTry = error.inTry;
        this.more = error.more;
    }
    send(res) {
        res.status(this.type).json({
            more: this.more,
            inTry: this.inTry,
            errorObj: this.type === 500 ? Object.assign({}, this.e) : undefined,
            error: this.type === 500
                ? 'some error: ' + this.e.message
                : this.e,
            info: this.type === 500 // стандартное описание ошибки
                ? "Back doesn't know what the error is... ^._.^"
                : 'Check your request! /ᐠ-ꞈ-ᐟ\\',
        });
    }
}
exports.BaseError = BaseError;
BaseError.PromiseWithTry = (inTryName) => (getAnswer, methodName, more) => {
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const answer = yield getAnswer();
            res(answer);
        }
        catch (e) {
            if (e instanceof BaseError) {
                rej(e);
            }
            else {
                rej(new BaseError({
                    type: 500,
                    e,
                    inTry: `${inTryName}${methodName}`,
                    more,
                }));
            }
        }
    }));
};
BaseError.PromiseWithTryAndSend = (inTryName) => (response, getAnswer, methodName, more) => {
    return new Promise((res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const answer = yield BaseError.PromiseWithTry(inTryName)(getAnswer, methodName, more);
            if (answer instanceof BaseError) {
                answer.send(response);
            }
            else {
                res(answer);
            }
        }
        catch (e) {
            e.send(response);
        }
    }));
};
//# sourceMappingURL=BaseError.js.map