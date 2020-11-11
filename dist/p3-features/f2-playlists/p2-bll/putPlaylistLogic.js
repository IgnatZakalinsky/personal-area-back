"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPlaylistLogic = void 0;
const index_1 = require("./index");
const Updater_1 = require("../../../p1-common/c2-validators/Updater");
exports.putPlaylistLogic = (id, playlist) => {
    const checkF = (item, oldItem) => {
        return {
            // name: !item.name ? oldItem.name : item.name,
            name: Updater_1.Updater.string(item.name, oldItem.name),
            levelAccess: Updater_1.Updater.number(item.levelAccess, oldItem.levelAccess),
            // levelAccess: (item.levelAccess === 0)
            //     ? 0
            //     : !item.levelAccess
            //         ? oldItem.levelAccess
            //         : item.levelAccess,
            tags: Updater_1.Updater.arrayString(item.tags, oldItem.tags),
        };
    };
    return index_1.PlaylistLogic.putItem(id, playlist, checkF);
};
//# sourceMappingURL=putPlaylistLogic.js.map