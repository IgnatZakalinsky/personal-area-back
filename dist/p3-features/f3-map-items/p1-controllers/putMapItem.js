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
exports.putMapItem = void 0;
const errors_1 = require("../../../p1-common/c1-errors/errors");
const putMapItemLogic_1 = require("../p2-bll/putMapItemLogic");
exports.putMapItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mapItem } = req.body;
    if (!mapItem)
        errors_1.status400(res, 'No mapItem in body! /ᐠ-ꞈ-ᐟ\\', 'putMapItem', { body: req.body });
    if (!mapItem._id)
        errors_1.status400(res, 'No _id in mapItem! /ᐠ-ꞈ-ᐟ\\', 'putMapItem', { body: req.body });
    else {
        const checkedMapItem = {
            name: !mapItem.name ? 'no Name' : String(mapItem.name),
            type: !mapItem.type ? 'no Type' : String(mapItem.type),
            lat: (mapItem.lat === 0 || mapItem.lat === '0')
                ? 0
                : !mapItem.lat
                    ? 100000
                    : (+mapItem.lat || 100000),
            lng: (mapItem.lng === 0 || mapItem.lng === '0')
                ? 0
                : !mapItem.lng
                    ? 100000
                    : (+mapItem.lng || 100000),
            JSONData: !mapItem.JSONData ? '{}' : String(mapItem.JSONData),
        };
        putMapItemLogic_1.putMapItemLogic(String(mapItem._id), checkedMapItem)
            .then((answer) => {
            switch (answer.type) {
                case 200: {
                    res.status(200).json({ updatedPlaylist: answer.updatedMapItem });
                    break;
                }
                case 500: {
                    errors_1.status500(res, answer.error.e, answer.error.inTry, answer.error.more);
                    break;
                }
                case 400: {
                    errors_1.status400(res, answer.error.e, answer.error.inTry, answer.error.more);
                    break;
                }
            }
        })
            .catch(e => errors_1.status500(res, e, 'putMapItem', { body: req.body, checkedMapItem }));
    }
});
//# sourceMappingURL=putMapItem.js.map