"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
const BaseError_1 = require("../c1-errors/BaseError");
class Validators {
    static string(item, def, emptyString, throwErrorName) {
        const checkedItem = (item === undefined)
            ? def
            : (item === '')
                ? emptyString // in mongoose required property === '' not valid
                : typeof item !== 'string'
                    ? throwErrorName
                        ? new BaseError_1.BaseError({
                            type: 400,
                            inTry: `${throwErrorName}.${this.name}.string`,
                            e: `not valid property ${throwErrorName} = ${item} ^._.^`,
                            more: { item, def, emptyString, throwErrorName },
                        })
                        : def
                    : item;
        if (checkedItem instanceof BaseError_1.BaseError) {
            throw checkedItem;
        }
        else {
            return checkedItem;
        }
    }
    static number(item, def, throwErrorName) {
        const checkedItem = (item === undefined)
            ? def
            : (item === 0)
                ? 0
                : typeof item !== 'number'
                    ? throwErrorName
                        ? new BaseError_1.BaseError({
                            type: 400,
                            inTry: `${throwErrorName}.${this.name}.number`,
                            e: `not valid property ${throwErrorName} = ${item} ^._.^`,
                            more: { item, def, throwErrorName },
                        })
                        : def
                    : item;
        if (checkedItem instanceof BaseError_1.BaseError) {
            throw checkedItem;
        }
        else {
            return checkedItem;
        }
    }
    static array(item, def, checkType, throwErrorName) {
        const checkedItem = (item && item.constructor === Array)
            ? item
            : false;
        if (item === undefined) {
            return def;
        }
        let i = 0;
        if (checkedItem) {
            while (checkedItem.length > i
                && (typeof checkedItem[i] === typeof checkType
                    || (typeof checkType === 'function'
                        && checkedItem[i] instanceof checkType))) {
                i++;
            }
        }
        if (!checkedItem || checkedItem.length !== i) {
            const answer = throwErrorName
                ? new BaseError_1.BaseError({
                    type: 400,
                    inTry: `${throwErrorName}.${this.name}.array`,
                    e: `not valid property ${throwErrorName} = ${(checkedItem && checkedItem.length !== i)
                        ? `item[${i}] = ${checkedItem[i]}`
                        : item} ^._.^`,
                    more: {
                        item,
                        def,
                        checkType: typeof checkType,
                        forCheckTypeValue: checkType,
                        i,
                        isCheckedItem: !!checkedItem,
                        checkedValue: checkedItem ? checkedItem[i] : undefined,
                        throwErrorName,
                    },
                })
                : def;
            if (answer instanceof BaseError_1.BaseError) {
                throw answer;
            }
            else {
                return answer;
            }
        }
        else {
            return checkedItem;
        }
    }
    static forUndefinedError(item, throwErrorName) {
        if (item === undefined) {
            throw new BaseError_1.BaseError({
                type: 400,
                inTry: `${throwErrorName}.${this.name}.forUndefinedError`,
                e: `not valid property ${throwErrorName} = ${item} ^._.^`,
                more: { item, throwErrorName },
            });
        }
    }
}
exports.Validators = Validators;
//# sourceMappingURL=Validators.js.map