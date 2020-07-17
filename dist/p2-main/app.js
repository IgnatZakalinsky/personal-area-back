"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appUse = void 0;
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const debug_1 = require("../p1-common/c0-debug/debug");
exports.appUse = (app) => {
    app.use(cors_1.default());
    app.use(cookie_parser_1.default());
    // parse application/json
    app.use(body_parser_1.default.json({ limit: "7mb" }));
    // parse application/x-www-form-urlencoded
    app.use(body_parser_1.default.urlencoded({ limit: "7mb", extended: false }));
    // log middleware
    app.use((req, res, next) => {
        debug_1.log("Time: ", new Date().toString());
        debug_1.log(req.method, req.url, "params: ", req.params);
        debug_1.log("query:", req.query);
        debug_1.log("body:", req.body);
        debug_1.log("cookies:", req.cookies);
        // log("headers:", req.headers);
        // log("rawHeaders:", req.rawHeaders);
        next();
    });
};
//# sourceMappingURL=app.js.map