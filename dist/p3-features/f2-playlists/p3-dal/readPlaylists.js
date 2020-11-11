"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPlaylists = void 0;
const playlist_1 = require("../p0-models/playlist");
const baseDAL_1 = require("../../../p1-common/c5-dal/baseDAL");
// export const readPlaylists = (find: any, sort: any, itemForPageCount = 1000, pageNumber = 1) => {
//
//     return Playlist.find(find)
//         .sort(sort)
//         .skip(itemForPageCount * (pageNumber - 1))
//         .limit(itemForPageCount)
//         .lean()
//         .exec()
// }
exports.readPlaylists = (find, sort, itemForPageCount = 1000, pageNumber = 1) => {
    return baseDAL_1.baseDAL(playlist_1.Playlist).readArray(find, sort, itemForPageCount, pageNumber);
};
//# sourceMappingURL=readPlaylists.js.map