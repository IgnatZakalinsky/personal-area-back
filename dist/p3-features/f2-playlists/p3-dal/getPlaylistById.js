"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylistById = void 0;
const playlist_1 = __importDefault(require("../p0-models/playlist"));
exports.getPlaylistById = (id) => {
    return playlist_1.default.findById(id)
        .exec();
};
//# sourceMappingURL=getPlaylistById.js.map