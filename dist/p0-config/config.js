"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION_1_0 = exports.IS_DEVELOPER_VERSION = exports.MONGO_DB_URIS = void 0;
const USER_NAME = process.env.MONGO_DB_USER_NAME || "ai73aaa"; // user name for test db
const PASSWORD = process.env.MONGO_DB_USER_PASSWORD || "1qazxcvBG"; // user password for test db
const MONGO_DB_URL = process.env.MONGO_DB_URL || "neko0-iwojt.mongodb.net/nekobd"; // db for tests
exports.MONGO_DB_URIS = `mongodb+srv://${USER_NAME}:${PASSWORD}@${MONGO_DB_URL}?retryWrites=true&w=majority`;
exports.IS_DEVELOPER_VERSION = false;
exports.VERSION_1_0 = "/1.0";
//# sourceMappingURL=config.js.map