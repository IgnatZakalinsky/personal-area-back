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
exports.addPlaylist = exports.PlaylistController = void 0;
const p2_bll_1 = require("../p2-bll");
const BaseController_v2_1 = require("../../../p1-common/c3-controllers/BaseController-v2");
const BaseError_1 = require("../../../p1-common/c1-errors/BaseError");
const Validators_1 = require("../../../p1-common/c2-validators/Validators");
exports.PlaylistController = new BaseController_v2_1.BaseController(p2_bll_1.PlaylistLogic);
exports.addPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlist } = req.body;
    const inTry = 'PreController:Playlist.addPlaylist.';
    if (!playlist) {
        new BaseError_1.BaseError({
            type: 400,
            e: 'No playlist in body! /ᐠ-ꞈ-ᐟ\\',
            inTry: inTry + 'playlist',
            more: { body: req.body },
        })
            .send(res);
    }
    else {
        yield exports.PlaylistController.ControllerPromise(res, () => __awaiter(void 0, void 0, void 0, function* () {
            const checkedPlaylist = {
                name: Validators_1.Validators.string(playlist.name, 'no Name', 'no Name', inTry + 'checkedPlaylist[name]'),
                levelAccess: Validators_1.Validators.number(playlist.levelAccess, 100000, inTry + 'checkedPlaylist[levelAccess]'),
                tags: Validators_1.Validators.array(playlist.tags, [], 'string', inTry + 'checkedPlaylist[tags]'),
            };
            yield exports.PlaylistController.addItem(req, res, Object.assign(Object.assign({}, checkedPlaylist), { updated: new Date(), created: new Date() }));
        }), inTry + 'checkedPlaylist', { playlist });
    }
});
//# sourceMappingURL=index.js.map