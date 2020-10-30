"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePlaylistById = void 0;
const playlist_1 = __importDefault(require("../p0-models/playlist"));
exports.removePlaylistById = (id) => {
    return playlist_1.default.findByIdAndDelete(id)
        .exec();
};
//# sourceMappingURL=removePlaylistById.js.map