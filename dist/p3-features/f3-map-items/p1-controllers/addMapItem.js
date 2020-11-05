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
exports.addMapItem = void 0;
const errors_1 = require("../../../p1-common/c1-errors/errors");
const addMapItemLogic_1 = require("../p2-bll/addMapItemLogic");
exports.addMapItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mapItem } = req.body;
    if (!mapItem)
        errors_1.status400(res, 'No mapItem in body! /ᐠ-ꞈ-ᐟ\\', 'addMapItem', { body: req.body });
    else {
        const checkedMapItem = {
            name: !mapItem.name ? 'no Name' : String(mapItem.name),
            type: !mapItem.type ? 'no Type' : String(mapItem.type),
            lat: (mapItem.lat === 0 || mapItem.lat === '0')
                ? 0
                : !mapItem.lat
                    ? 53.53
                    : (+mapItem.lat || 53.53),
            lng: (mapItem.lng === 0 || mapItem.lng === '0')
                ? 0
                : !mapItem.lng
                    ? 27.34
                    : (+mapItem.lng || 27.34),
            JSONData: !mapItem.JSONData ? '{}' : String(mapItem.JSONData),
        };
        addMapItemLogic_1.addMapItemLogic(checkedMapItem)
            .then(addedMapItem => {
            res.status(201).json({ addedMapItem });
        })
            .catch(e => errors_1.status500(res, e, 'addMapItem/createMapItem', { body: req.body, checkedMapItem }));
    }
});
//# sourceMappingURL=addMapItem.js.map