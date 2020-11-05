"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMapItemById = void 0;
const mapItem_1 = __importDefault(require("../p0-models/mapItem"));
exports.getMapItemById = (id) => {
    return mapItem_1.default.findById(id)
        .exec();
};
//# sourceMappingURL=getMapItemById.js.map