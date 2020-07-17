"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status400 = exports.status500 = void 0;
const config_1 = require("../../p0-config/config");
const debug_1 = require("../c0-debug/debug");
exports.status500 = (res, e, inTry) => {
    const error = {
        error: "some error: " + e.message,
        errorObject: config_1.IS_DEVELOPER_VERSION && Object.assign({}, e),
        in: inTry,
        info: "Back doesn't know what the error is... ^._.^"
    };
    debug_1.log("!!! Error 500: ", error);
    res.status(500).json(error);
};
exports.status400 = (res, e, inTry) => {
    const error = {
        error: e,
        in: inTry,
        info: "Check your request! /ᐠ-ꞈ-ᐟ\\"
    };
    console.log("!!! Error 400: ", error);
    res.status(400).json(error);
};
//# sourceMappingURL=errors.js.map