"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMapItemLogic = void 0;
const getMapItemById_1 = require("../p3-dal/getMapItemById");
const removeMapItemById_1 = require("../p3-dal/removeMapItemById");
exports.deleteMapItemLogic = (id) => {
    return new Promise((res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mapItem = yield getMapItemById_1.getMapItemById(id);
            if (!mapItem)
                res({
                    type: 400,
                    error: { e: 'mapItem id not valid /ᐠ｡ꞈ｡ᐟ\\', inTry: 'deleteMapItem/getMapItemById', more: { id } },
                });
            else {
                try {
                    const deletedMapItem = yield removeMapItemById_1.removeMapItemById(id);
                    res({ type: 200, deletedMapItem });
                }
                catch (e) {
                    res({
                        type: 500,
                        error: { e, inTry: 'deleteMapItem/removeMapItemById', more: { id } },
                    });
                }
            }
        }
        catch (e) {
            res({
                type: 400,
                error: {
                    e: 'may be mapItem id not valid /ᐠ｡ꞈ｡ᐟ\\',
                    inTry: 'deleteMapItem/getMapItemById',
                    more: { id, error: 'some error: ' + e.message, errorObject: Object.assign({}, e) },
                }
            });
        }
    }));
};
//# sourceMappingURL=deleteMapItemLogic.js.map