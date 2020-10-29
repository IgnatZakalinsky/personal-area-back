"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addPlaylist_1 = require("./p1-controllers/addPlaylist");
const getPlaylist_1 = require("./p1-controllers/getPlaylist");
const playlists = express_1.default.Router();
playlists.post('/', addPlaylist_1.addPlaylist);
playlists.get('/', getPlaylist_1.getPlaylists);
exports.default = playlists;
//# sourceMappingURL=index.js.map