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
exports.deletePlaylistLogic = void 0;
const getPlaylistById_1 = require("../p3-dal/getPlaylistById");
const removePlaylistById_1 = require("../p3-dal/removePlaylistById");
exports.deletePlaylistLogic = (id) => {
    return new Promise((res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const playlist = yield getPlaylistById_1.getPlaylistById(id);
            if (!playlist)
                res({
                    type: 400,
                    error: { e: 'playlist id not valid /ᐠ｡ꞈ｡ᐟ\\', inTry: 'deletePlaylist/getPlaylistById', more: { id } },
                });
            else {
                try {
                    const deletedPlaylist = yield removePlaylistById_1.removePlaylistById(id);
                    res({ type: 200, deletedPlaylist });
                }
                catch (e) {
                    res({
                        type: 500,
                        error: { e, inTry: 'deletePlaylist/removePlaylistById', more: { id } },
                    });
                }
            }
        }
        catch (e) {
            res({
                type: 400,
                error: {
                    e: 'may be playlist id not valid /ᐠ｡ꞈ｡ᐟ\\',
                    inTry: 'deletePlaylist/getPlaylistById',
                    more: { id, error: 'some error: ' + e.message, errorObject: Object.assign({}, e) },
                }
            });
        }
    }));
};
//# sourceMappingURL=deletePlaylistLogic.js.map