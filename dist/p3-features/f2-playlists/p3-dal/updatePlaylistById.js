"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePlaylistById = void 0;
const playlist_1 = __importDefault(require("../p0-models/playlist"));
exports.updatePlaylistById = (id, playlist) => {
    return playlist_1.default.findByIdAndUpdate(id, playlist, { new: true })
        .exec();
};
//# sourceMappingURL=updatePlaylistById.js.map