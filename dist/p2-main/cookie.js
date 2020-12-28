"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resCookie = exports.cookie = exports.cookieSettings = void 0;
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("../p0-config/config");
exports.cookieSettings = !config_1.IS_DEVELOPER_VERSION ? {} : { sameSite: 'none', secure: true };
exports.cookie = (app) => {
    // const whitelist = ['http://localhost:3000', 'http://example2.com']
    const corsOptions = {
        credentials: true,
        origin: (origin, callback) => {
            // if(whitelist.includes(origin || ''))
            //     return callback(null, true)
            //
            // callback(new Error('Not allowed by CORS'))
            console.log('origin: ', origin); // need log always
            callback(null, true); // everyone is allowed
        }
    };
    app.use(cors_1.default(corsOptions));
    app.use(cookie_parser_1.default());
};
// export const resCookie = (res: Response, user: IUser) => {
//     return res.cookie('token', user.token, {
//         ...cookieSettings,
//         expires: new Date(user.tokenDeathTime || 0),
//     })
// }
exports.resCookie = (res, token) => {
    return res.cookie('token', token, Object.assign(Object.assign({}, exports.cookieSettings), { expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)) }));
};
//# sourceMappingURL=cookie.js.map