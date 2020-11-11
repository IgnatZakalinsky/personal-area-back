"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistLogic = void 0;
const baseBLL_1 = require("../../../p1-common/c4-bll/baseBLL");
const p3_dal_1 = require("../p3-dal");
const Updater_1 = require("../../../p1-common/c2-validators/Updater");
const checkUpdate = (item, oldItem) => {
    return {
        name: Updater_1.Updater.string(item.name, oldItem.name),
        levelAccess: Updater_1.Updater.number(item.levelAccess, oldItem.levelAccess),
        tags: Updater_1.Updater.arrayString(item.tags, oldItem.tags),
    };
};
exports.PlaylistLogic = baseBLL_1.baseBLL(p3_dal_1.Playlists, 'Playlist', checkUpdate);
//# sourceMappingURL=index.js.map