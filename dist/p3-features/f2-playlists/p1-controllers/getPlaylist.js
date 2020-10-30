"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylists = void 0;
const getPlaylistsLogic_1 = require("../p2-bll/getPlaylistsLogic");
const errors_1 = require("../../../p1-common/c1-errors/errors");
exports.getPlaylists = (req, res) => {
    getPlaylistsLogic_1.getPlaylistsLogic()
        .then(answer => {
        switch (answer.type) {
            case 200: {
                res.status(200).json({
                    playlists: answer.playlists,
                    playlistsTotalCount: answer.playlistsTotalCount
                });
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
        .catch(e => errors_1.status500(res, e, 'getPlaylists'));
};
//# sourceMappingURL=getPlaylist.js.map