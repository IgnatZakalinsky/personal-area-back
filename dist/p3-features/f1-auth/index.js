"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logIn_1 = require("./a1-controllers/logIn");
const auth = express_1.default.Router();
// auth.get('/', getUsersForDev); // for developers
auth.post("/login", logIn_1.logIn);
exports.default = auth;
//# sourceMappingURL=index.js.map