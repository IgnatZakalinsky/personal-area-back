"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updater = void 0;
exports.Updater = {
    string(item, oldItem) {
        return (item === '')
            ? ''
            : !item ? oldItem : item;
    },
    number(item, oldItem) {
        return (item === 0)
            ? 0
            : !item ? oldItem : item;
    },
    arrayString(item, oldItem) {
        return item.length > 0 && !item[0]
            ? oldItem : item;
    },
};
//# sourceMappingURL=Updater.js.map