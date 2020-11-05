"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMapItemById = void 0;
const mapItem_1 = __importDefault(require("../p0-models/mapItem"));
exports.updateMapItemById = (id, mapItem) => {
    return mapItem_1.default.findByIdAndUpdate(id, mapItem, { new: true })
        .exec();
};
//# sourceMappingURL=updateMapItemById.js.map