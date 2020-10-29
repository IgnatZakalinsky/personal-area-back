"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlaylist = void 0;
const playlist_1 = __importDefault(require("../p0-models/playlist"));
exports.createPlaylist = (checkedPlaylist) => {
    return playlist_1.default.create(Object.assign(Object.assign({}, checkedPlaylist), { created: new Date(), updated: new Date() }));
};
//# sourceMappingURL=createPlaylist.js.map