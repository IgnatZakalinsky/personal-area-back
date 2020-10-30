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
exports.getPlaylistsLogic = void 0;
const readPlaylists_1 = require("../p3-dal/readPlaylists");
const countPlaylists_1 = require("../p3-dal/countPlaylists");
exports.getPlaylistsLogic = () => {
    return new Promise((res) => __awaiter(void 0, void 0, void 0, function* () {
        // const sortName: string = (sortPacksF && sortPacksF.length > 2) ? sortPacksF.slice(1) : ''
        const sortName = '';
        // const direction = sortName ? (sortPacksF[0] === '0' ? -1 : 1) : undefined
        const direction = undefined;
        const sort = sortName ? { [sortName]: direction } : { updated: -1 };
        const findBase = {
            name: new RegExp('', 'gi'),
        };
        // const findPrivate = user_idF && user._id.equals(user_idF) ? {} : {private: false}
        // const findByUserId = user_id ? {user_id: user_idF} : {}
        const find = Object.assign({}, findBase);
        try {
            const playlistsTotalCount = yield countPlaylists_1.countPlaylists(find);
            try {
                const playlists = yield readPlaylists_1.readPlaylists(find, sort);
                res({ type: 200, playlists, playlistsTotalCount });
            }
            catch (e) {
                res({
                    type: 500,
                    error: { e, inTry: 'getPlaylists/readPlaylists', more: { find, sort, playlistsTotalCount } },
                });
            }
        }
        catch (e) {
            res({
                type: 500,
                error: { e, inTry: 'getPlaylists/countPlaylists', more: { find } },
            });
        }
    }));
};
//# sourceMappingURL=getPlaylistsLogic.js.map