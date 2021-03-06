"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const config_1 = require("../p0-config/config");
const f1_auth_1 = __importDefault(require("../p3-features/f1-auth"));
const f2_playlists_1 = __importDefault(require("../p3-features/f2-playlists"));
const f3_map_items_1 = __importDefault(require("../p3-features/f3-map-items"));
const f2_playlists_v2_1 = __importDefault(require("../p3-features/f2-playlists-v2"));
exports.routes = (app) => {
    app.use(config_1.VERSION_1_0 + '/auth', f1_auth_1.default);
    app.use(config_1.VERSION_1_0 + '/playlists', f2_playlists_1.default);
    app.use(config_1.VERSION_1_0 + '/playlists2', f2_playlists_v2_1.default);
    app.use(config_1.VERSION_1_0 + '/map-items', f3_map_items_1.default);
    // ping endpoint
    app.use(config_1.VERSION_1_0 + '/ping', (req, res) => {
        // save statistic
        const backTime = new Date().getTime();
        const frontTime = +req.body.frontTime || (req.query.frontTime && +req.query.frontTime) || (backTime + 1);
        const ping = backTime - frontTime;
        console.log('!!! PING: ', ping); // need log always
        res.status(200).json({
            ping,
            backTime,
            frontTime: frontTime > backTime ? '—ฅ/ᐠ.̫ .ᐟ\\ฅ—' : frontTime,
            info: 'please send me you time —ฅ/ᐠ.̫ .ᐟ\\ฅ—',
        });
    });
    // default
    app.use((req, res) => {
        console.log('bad url: ', req.method, req.url);
        res.status(404).json({
            error: 'bad url /ᐠ｡ꞈ｡ᐟ\\',
            method: req.method,
            url: req.url,
            query: req.query,
            body: req.body,
        });
    });
};
//# sourceMappingURL=routes.js.map