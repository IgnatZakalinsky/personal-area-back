"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueProperties = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// type X = {
//     a: 1
//     b: 2
//     c: 3
//     d: 4
// }
// type Y = {
//     b: 2
//     c: 3
//     d: 4
//     e: 5
//     f: 6
// }
// type Intersection<X, Y> = {
//     [k in  keyof X & keyof Y]: Y[k]
// }
// type Z<X, Y> = {
//     [k in Extract<keyof X, keyof Y>]: X[k]
// }
// const x: Z<X, Y> = {b: 2, c: 3, d: 4 }
exports.uniqueProperties = ['name'];
// export type UpdatePlaylistType = Partial<PlaylistType>
// export type UpdatePlaylistType = {
//     name?: string
//     levelAccess?: number
//     tags?: string[]
// }
// new Schema for object
const PlaylistSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    levelAccess: {
        type: Number,
        required: true,
    },
    tags: [{
            type: String,
        }],
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
});
const Playlist = mongoose_1.default.model('ii-playlist', PlaylistSchema);
exports.default = Playlist;
//# sourceMappingURL=PlaylistModel.js.map