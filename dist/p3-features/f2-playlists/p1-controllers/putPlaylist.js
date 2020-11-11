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
exports.putPlaylist = void 0;
const errors_1 = require("../../../p1-common/c1-errors/errors");
const index_1 = require("./index");
const Checker_1 = require("../../../p1-common/c2-validators/Checker");
exports.putPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlist } = req.body;
    if (!playlist)
        errors_1.status400(res, 'No playlist in body! /ᐠ-ꞈ-ᐟ\\', 'putPlaylist', { body: req.body });
    if (!playlist._id)
        errors_1.status400(res, 'No _id in playlist! /ᐠ-ꞈ-ᐟ\\', 'putPlaylist', { body: req.body });
    else {
        const checkedPlaylist = {
            name: Checker_1.Checker.string(playlist.name, undefined),
            levelAccess: Checker_1.Checker.number(playlist.levelAccess, NaN),
            tags: Checker_1.Checker.arrayString(playlist.tags, ['']),
        };
        index_1.PlaylistController.updateItem(req, res, playlist._id, checkedPlaylist);
    }
});
//# sourceMappingURL=putPlaylist.js.map