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
const putPlaylistLogic_1 = require("../p2-bll/putPlaylistLogic");
exports.putPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlist } = req.body;
    if (!playlist)
        errors_1.status400(res, 'No playlist in body! /ᐠ-ꞈ-ᐟ\\', 'addPlaylist', { body: req.body });
    if (!playlist._id)
        errors_1.status400(res, 'No _id in playlist! /ᐠ-ꞈ-ᐟ\\', 'addPlaylist', { body: req.body });
    else {
        const checkedPlaylist = {
            name: !playlist.name ? '' : String(playlist.name),
            levelAccess: (playlist.levelAccess === 0 || playlist.levelAccess === '0')
                ? 0
                : !playlist.levelAccess
                    ? NaN
                    : (+playlist.levelAccess || NaN),
            tags: (!playlist.tags || playlist.tags.constructor !== Array)
                ? [''] // нельзя добавлять '' тег
                : playlist.tags.map((t) => String(t)),
        };
        putPlaylistLogic_1.putPlaylistLogic(String(playlist._id), checkedPlaylist)
            .then((answer) => {
            switch (answer.type) {
                case 200: {
                    res.status(200).json({ updatedPlaylist: answer.updatedPlaylist });
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
            .catch(e => errors_1.status500(res, e, 'putPlaylist', { body: req.body, checkedPlaylist }));
    }
});
//# sourceMappingURL=putPlaylist.js.map