"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checker = void 0;
exports.Checker = {
    string(item, def) {
        return (item === '')
            ? ''
            : !item ? def : item;
    },
    number(item, def) {
        return (item === 0)
            ? 0
            : !item ? def : item;
    },
    arrayString(item, def) {
        return item.length > 0 && !item[0]
            ? def : item;
    },
};
//# sourceMappingURL=Checker.js.map