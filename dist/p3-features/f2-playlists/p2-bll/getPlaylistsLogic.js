"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylistsLogic = void 0;
const index_1 = require("./index");
exports.getPlaylistsLogic = () => {
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
    return index_1.PlaylistLogic.getItems(find, sort);
};
//# sourceMappingURL=getPlaylistsLogic.js.map