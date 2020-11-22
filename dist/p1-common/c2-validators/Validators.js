"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
class Validators {
    static string(item, def) {
        return (item === '')
            ? ''
            : !item ? def : item;
    }
    static number(item, def) {
        return (item === 0)
            ? 0
            : !item ? def : item;
    }
    static array(item, def, checkType) {
        const answer = item && item.constructor === Array && item;
        let i = 0;
        if (answer) {
            while (answer.length > i && typeof answer[i] === typeof checkType) {
                i++;
            }
        }
        if (!answer || answer.length !== i) {
            return def;
        }
        else {
            return answer;
        }
    }
}
exports.Validators = Validators;
//# sourceMappingURL=Validators.js.map