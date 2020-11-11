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
exports.deletePlaylist = void 0;
const errors_1 = require("../../../p1-common/c1-errors/errors");
const p2_bll_1 = require("../p2-bll");
exports.deletePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        errors_1.status400(res, 'No id in params! /ᐠ-ꞈ-ᐟ\\', 'deletePlaylist', { params: req.params });
    p2_bll_1.PlaylistLogic.deleteItem(id + '')
        .then((answer) => {
        switch (answer.type) {
            case 200: {
                res.status(200).json({ deletedPlaylist: answer.deletedItem });
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
        .catch(e => errors_1.status500(res, e, 'deletePlaylist', { params: req.params }));
});
//# sourceMappingURL=deletePlaylist.js.map