"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countMapItems = void 0;
const mapItem_1 = __importDefault(require("../p0-models/mapItem"));
exports.countMapItems = (find) => {
    return mapItem_1.default.count(find)
        .exec();
};
//# sourceMappingURL=countMapItems.js.map