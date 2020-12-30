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
exports.logIn = exports.ADMIN_PASS = void 0;
const errors_1 = require("../../../p1-common/c1-errors/errors");
const cookie_1 = require("../../../p2-main/cookie");
const config_1 = require("../../../p0-config/config");
exports.ADMIN_PASS = process.env.ADMIN_PASS || 'xxx';
exports.logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    if (token) {
        if (token === exports.ADMIN_PASS) {
            cookie_1.resCookie(res, exports.ADMIN_PASS, exports.ADMIN_PASS + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
                .status(200).json({ login: true });
        }
        else {
            try {
                const p = yield config_1.instance.post('api/friends/auth/login', { tempPassword: token });
                console.log('ok: ', Object.assign({}, p.data));
                if (p.data.resultCode === 1) {
                    errors_1.status400(res, 'login password not valid!', "login", { errors: p.data.messages });
                }
                else {
                    cookie_1.resCookie(res, p.data.data.token, p.data.data.token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
                        .status(200).json({ login: true });
                }
            }
            catch (e) {
                console.log('error: ', Object.assign({}, e));
                errors_1.status500(res, Object.assign({}, e), "login", { token });
            }
        }
    }
    else
        errors_1.status400(res, "no token in body!", "login", { body: req.body });
});
//# sourceMappingURL=logIn.js.map