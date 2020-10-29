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
exports.addPlaylist = void 0;
const errors_1 = require("../../../p1-common/c1-errors/errors");
const addPlaylistLogic_1 = require("../p2-bll/addPlaylistLogic");
exports.addPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlist } = req.body;
    if (!playlist)
        errors_1.status400(res, 'No playlist in body! /ᐠ-ꞈ-ᐟ\\', 'addPlaylist', { body: req.body });
    else {
        const checkedPlaylist = {
            name: !playlist.name ? 'no Name' : playlist.name + '',
            levelAccess: !playlist.levelAccess ? 100000 : (+playlist.levelAccess || 100000),
            tags: (!playlist.tags || playlist.tags.constructor !== Array)
                ? []
                : playlist.tags.map((t) => t + ''),
        };
        addPlaylistLogic_1.addPlaylistLogic(checkedPlaylist)
            .then(addedPlaylist => {
            res.status(201).json({ addedPlaylist });
        })
            .catch(e => errors_1.status500(res, e, 'addPlaylist/Playlist.create'));
    }
});
//# sourceMappingURL=addPlaylist.js.map