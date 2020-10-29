"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylists = void 0;
const getPlaylistsLogic_1 = require("../p2-bll/getPlaylistsLogic");
const errors_1 = require("../../../p1-common/c1-errors/errors");
exports.getPlaylists = (req, res) => {
    getPlaylistsLogic_1.getPlaylistsLogic()
        .then(answer => {
        res.status(200).json(answer);
    })
        .catch(e => errors_1.status500(res, e, 'getPlaylists/Playlist.find'));
};
//# sourceMappingURL=getPlaylist.js.map