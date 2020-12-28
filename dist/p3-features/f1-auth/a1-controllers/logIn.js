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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.instance = void 0;
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("../../../p1-common/c1-errors/errors");
const cookie_1 = require("../../../p2-main/cookie");
exports.instance = axios_1.default.create({
    baseURL: 'https://labs-api.staging.it-kamasutra.com/',
    headers: { 'FRIEND-KEY': process.env.FRIEND_KEY }
});
exports.logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    if (token) {
        try {
            const p = yield exports.instance.post('api/friends/auth/login', { tempPassword: token });
            console.log('ok: ', Object.assign({}, p.data));
            if (p.data.resultCode === 1) {
                errors_1.status400(res, p.data.messages[0], "login");
            }
            else {
                cookie_1.resCookie(res, p.data.data.token).status(200).json(p.data.data);
            }
        }
        catch (e) {
            console.log('error: ', Object.assign({}, e));
            errors_1.status500(res, Object.assign({}, e), "login", { token });
        }
    }
    else
        errors_1.status400(res, "no token in body!", "login", { body: req.body });
});
//# sourceMappingURL=logIn.js.map