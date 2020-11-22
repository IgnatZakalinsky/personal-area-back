"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlaylist = void 0;
const BaseError_1 = require("../../../p1-common/c1-errors/BaseError");
const Validators_1 = require("../../../p1-common/c2-validators/Validators");
const index_1 = require("./index");
exports.addPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlist } = req.body;
    if (!playlist) {
        new BaseError_1.BaseError({ type: 400, e: 'No playlist in body! /ᐠ-ꞈ-ᐟ\\', inTry: 'addPlaylist', more: { body: req.body } })
            .send(res);
    }
    else {
        const checkedPlaylist = {
            name: Validators_1.Validators.string(playlist.name, 'no Name'),
            levelAccess: Validators_1.Validators.number(playlist.levelAccess, 100000),
            tags: Validators_1.Validators.array(playlist.tags, [], 'string'),
        };
        yield index_1.PlaylistController.addItem(req, res, Object.assign(Object.assign({}, checkedPlaylist), { updated: new Date(), created: new Date() }));
    }
});
//# sourceMappingURL=addPlaylist.js.map