"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPlaylists = void 0;
const playlist_1 = __importDefault(require("../p0-models/playlist"));
exports.readPlaylists = (find, sort, itemForPageCount = 1000, pageNumber = 1) => {
    return playlist_1.default.find(find)
        .sort(sort)
        .skip(itemForPageCount * (pageNumber - 1))
        .limit(itemForPageCount)
        .lean()
        .exec();
};
//# sourceMappingURL=readPlaylists.js.map