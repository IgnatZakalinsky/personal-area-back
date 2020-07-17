"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const config_1 = require("../../p0-config/config");
exports.log = (...args) => {
    if (config_1.IS_DEVELOPER_VERSION)
        console.log(...args);
};
//# sourceMappingURL=debug.js.map