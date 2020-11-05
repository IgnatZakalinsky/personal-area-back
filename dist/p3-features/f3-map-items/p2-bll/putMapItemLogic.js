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
exports.putMapItemLogic = void 0;
const getMapItemById_1 = require("../p3-dal/getMapItemById");
const updateMapItemById_1 = require("../p3-dal/updateMapItemById");
const debug_1 = require("../../../p1-common/c0-debug/debug");
exports.putMapItemLogic = (id, mapItem) => {
    return new Promise((res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const oldMapItem = yield getMapItemById_1.getMapItemById(id);
            if (!oldMapItem)
                res({
                    type: 400,
                    error: {
                        e: 'mapItem id not valid /ᐠ｡ꞈ｡ᐟ\\',
                        inTry: 'putMapItem/getMapItemById',
                        more: { id, mapItem, oldMapItem },
                    }
                });
            else {
                try {
                    const newMapItem = {
                        name: !mapItem.name ? oldMapItem.name : mapItem.name,
                        type: !mapItem.type ? oldMapItem.type : mapItem.type,
                        lat: (mapItem.lat === 0)
                            ? 0
                            : !mapItem.lat
                                ? oldMapItem.lat
                                : mapItem.lat,
                        lng: (mapItem.lng === 0)
                            ? 0
                            : !mapItem.lng
                                ? oldMapItem.lng
                                : mapItem.lng,
                        JSONData: !mapItem.JSONData ? oldMapItem.JSONData : mapItem.JSONData,
                    };
                    debug_1.log('newMapItem: ', newMapItem);
                    const updatedMapItem = yield updateMapItemById_1.updateMapItemById(id, newMapItem);
                    res({ type: 200, updatedMapItem });
                }
                catch (e) {
                    res({
                        type: 500,
                        error: { e, inTry: 'putMapItem/updateMapItemById', more: { id, mapItem, oldMapItem } },
                    });
                }
            }
        }
        catch (e) {
            res({
                type: 400,
                error: {
                    e: 'may be mapItem id not valid /ᐠ｡ꞈ｡ᐟ\\',
                    inTry: 'putMapItem/getMapItemById',
                    more: { id, error: 'some error: ' + e.message, errorObject: Object.assign({}, e), mapItem },
                }
            });
        }
    }));
};
//# sourceMappingURL=putMapItemLogic.js.map