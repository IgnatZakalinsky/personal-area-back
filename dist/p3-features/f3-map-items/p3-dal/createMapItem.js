"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMapItem = void 0;
const mapItem_1 = __importDefault(require("../p0-models/mapItem"));
exports.createMapItem = (checkedMapItem) => {
    return mapItem_1.default.create(Object.assign(Object.assign({}, checkedMapItem), { created: new Date(), updated: new Date() }));
};
//# sourceMappingURL=createMapItem.js.map