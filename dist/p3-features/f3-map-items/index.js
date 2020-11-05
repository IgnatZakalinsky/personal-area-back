"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addMapItem_1 = require("./p1-controllers/addMapItem");
const deleteMapItem_1 = require("./p1-controllers/deleteMapItem");
const putMapItem_1 = require("./p1-controllers/putMapItem");
const getMapItems_1 = require("./p1-controllers/getMapItems");
const mapItems = express_1.default.Router();
mapItems.post('/', addMapItem_1.addMapItem);
mapItems.get('/', getMapItems_1.getMapItems);
mapItems.delete('/:id?', deleteMapItem_1.deleteMapItem);
mapItems.put('/', putMapItem_1.putMapItem);
exports.default = mapItems;
//# sourceMappingURL=index.js.map