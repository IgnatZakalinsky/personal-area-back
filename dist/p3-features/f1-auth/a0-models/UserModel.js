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
exports.uniqueUserProperties = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// export type PLAYLIST_TAGS = 'todolist'
//
// export type COURSES = 'React'
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
exports.uniqueUserProperties = ["baseId", "baseToken"];
// export type UpdatePlaylistType = Partial<PlaylistType>
// export type UpdatePlaylistType = {
//     name?: string
//     levelAccess?: number
//     tags?: string[]
// }
// new Schema for object
const UserSchema = new mongoose_1.Schema({
    baseId: {
        type: Number,
        required: true,
        unique: true,
    },
    level: {
        type: Number,
        required: true,
    },
    telegramId: {
        type: Number,
        required: true,
        unique: true,
    },
    lastUpdateDate: {
        type: String,
        required: true,
    },
    inactive: {
        type: Boolean,
        required: true,
    },
    courseId: {
        type: Number,
        required: true,
    },
    courseTitle: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    baseToken: {
        type: String,
        required: true,
    },
    tokens: [{
            type: String,
        }],
    isAdmin: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
});
const User = mongoose_1.default.model('ii-user', UserSchema);
exports.default = User;
//# sourceMappingURL=UserModel.js.map