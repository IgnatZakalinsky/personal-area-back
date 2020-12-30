"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logIn_1 = require("./a1-controllers/logIn");
const me_1 = require("./a1-controllers/me");
const logOut_1 = require("./a1-controllers/logOut");
const auth = express_1.default.Router();
auth.post('/login', logIn_1.logIn);
auth.get('/me', me_1.me);
auth.get('/logout', logOut_1.logOut);
exports.default = auth;
//# sourceMappingURL=index.js.map