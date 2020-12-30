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
exports.me = void 0;
const errors_1 = require("../../../p1-common/c1-errors/errors");
const cookie_1 = require("../../../p2-main/cookie");
const logIn_1 = require("./logIn");
const config_1 = require("../../../p0-config/config");
exports.me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (token) {
        if (token === logIn_1.ADMIN_PASS) {
            cookie_1.resCookie(res, token, logIn_1.ADMIN_PASS + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
                .status(200).json({ user: {
                    id: 3,
                    level: 100000,
                    telegramId: 746128012,
                    lastUpdateDate: '2020-12-30T10:09:01.0488913Z',
                    inactive: false,
                    courseId: 1,
                    courseTitle: 'Front-end developer',
                    firstName: 'Игнат',
                    lastName: 'Закалинский',
                    isAdmin: true
                } });
        }
        else {
            try {
                const p = yield config_1.instance.get('api/friends/auth/students/by-token/' + token);
                console.log('ok: ', Object.assign({}, p));
                // if (p.data.resultCode === 1) {
                //     status400(res, p.data.messages[0], "me")
                // } else {
                cookie_1.resCookie(res, token, token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
                    .status(200).json({ user: p.data });
                // }
            }
            catch (e) {
                errors_1.status500(res, Object.assign({}, e), "me", { token });
                console.log('error: ', e);
            }
        }
    }
    else
        errors_1.status400(res, "no token in cookies!", "me", { cookies: req.cookies });
});
//# sourceMappingURL=me.js.map