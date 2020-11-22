"use strict";
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
//# sourceMappingURL=BaseError.js.map