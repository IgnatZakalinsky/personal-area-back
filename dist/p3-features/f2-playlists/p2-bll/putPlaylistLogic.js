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
exports.putPlaylistLogic = void 0;
const getPlaylistById_1 = require("../p3-dal/getPlaylistById");
const updatePlaylistById_1 = require("../p3-dal/updatePlaylistById");
const debug_1 = require("../../../p1-common/c0-debug/debug");
exports.putPlaylistLogic = (id, playlist) => {
    return new Promise((res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const oldPlaylist = yield getPlaylistById_1.getPlaylistById(id);
            if (!oldPlaylist)
                res({
                    type: 400,
                    error: {
                        e: 'playlist id not valid /ᐠ｡ꞈ｡ᐟ\\',
                        inTry: 'putPlaylist/getPlaylistById',
                        more: { id, playlist, oldPlaylist },
                    }
                });
            else {
                try {
                    const newPlaylist = {
                        name: !playlist.name ? oldPlaylist.name : playlist.name,
                        levelAccess: (playlist.levelAccess === 0)
                            ? 0
                            : !playlist.levelAccess
                                ? oldPlaylist.levelAccess
                                : playlist.levelAccess,
                        tags: playlist.tags.length > 0 && !playlist.tags[0]
                            ? oldPlaylist.tags
                            : playlist.tags,
                    };
                    debug_1.log('newPlaylist: ', newPlaylist);
                    const updatedPlaylist = yield updatePlaylistById_1.updatePlaylistById(id, newPlaylist);
                    res({ type: 200, updatedPlaylist });
                }
                catch (e) {
                    res({
                        type: 500,
                        error: { e, inTry: 'putPlaylist/updatePlaylistById', more: { id, playlist, oldPlaylist } },
                    });
                }
            }
        }
        catch (e) {
            res({
                type: 400,
                error: {
                    e: 'may be playlist id not valid /ᐠ｡ꞈ｡ᐟ\\',
                    inTry: 'putPlaylist/getPlaylistById',
                    more: { id, error: 'some error: ' + e.message, errorObject: Object.assign({}, e), playlist },
                }
            });
        }
    }));
};
//# sourceMappingURL=putPlaylistLogic.js.map