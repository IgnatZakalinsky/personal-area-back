"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addPlaylist_1 = require("./p1-controllers/addPlaylist");
const playlists2 = express_1.default.Router();
playlists2.post('/', addPlaylist_1.addPlaylist);
// playlists.get('/', getPlaylists)
// playlists.delete('/:id?', PlaylistController.deleteItem.bind(PlaylistController))
// playlists.put('/', putPlaylist)
exports.default = playlists2;
//# sourceMappingURL=index.js.map