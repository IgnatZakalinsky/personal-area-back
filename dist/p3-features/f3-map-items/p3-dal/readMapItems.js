"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMapItems = void 0;
const mapItem_1 = __importDefault(require("../p0-models/mapItem"));
exports.readMapItems = (find, sort, itemForPageCount = 1000, pageNumber = 1) => {
    return mapItem_1.default.find(find)
        .sort(sort)
        .skip(itemForPageCount * (pageNumber - 1))
        .limit(itemForPageCount)
        .lean()
        .exec();
};
//# sourceMappingURL=readMapItems.js.map