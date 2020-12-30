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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = void 0;
const errors_1 = require("../../../p1-common/c1-errors/errors");
const cookie_1 = require("../../../p2-main/cookie");
const logIn_1 = require("./logIn");
const config_1 = require("../../../p0-config/config");
const index_1 = require("./index");
const BaseError_1 = require("../../../p1-common/c1-errors/BaseError");
const baseAdmin = {
    id: 3,
    level: 100000,
    telegramId: 746128012,
    lastUpdateDate: '2020-12-30T10:09:01.0488913Z',
    inactive: false,
    courseId: 1,
    courseTitle: 'Front-end developer',
    firstName: 'Игнат',
    lastName: 'Закалинскийxxxxxxxxxxxxxxxxxxxx',
    isAdmin: true
};
exports.me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (token) {
        if (token === logIn_1.ADMIN_PASS) {
            cookie_1.resCookie(res, token, logIn_1.ADMIN_PASS + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
                .status(200).json({ user: baseAdmin });
        }
        else {
            try {
                const p = yield config_1.instance.get('api/friends/auth/students/by-token/' + token);
                console.log('ok: ', Object.assign({}, p));
                if (p.data.resultCode === 1) {
                    errors_1.status400(res, 'token not valid!', "me", { errors: p.data.messages });
                }
                else {
                    const _a = p.data, { id } = _a, restData = __rest(_a, ["id"]);
                    //////////////////////////////////////////////////////////
                    const users = yield index_1.UserController._BLL.getItems({ baseId: id }, {});
                    if (users instanceof BaseError_1.BaseError) {
                        users.send(res);
                    }
                    else {
                        if (!users.length) {
                            const answer = yield index_1.UserController._BLL.addItem(Object.assign(Object.assign({}, restData), { baseId: id, baseToken: token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7), tokens: [], isAdmin: false }));
                            console.log('answer: ', answer);
                            if (answer instanceof BaseError_1.BaseError) {
                                answer.send(res);
                            }
                            else {
                                delete answer.baseToken;
                                delete answer.tokens;
                                cookie_1.resCookie(res, token, token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
                                    .status(200).json({ user: answer });
                            }
                        }
                        else {
                            const user = Object.assign(Object.assign({}, restData), { baseId: id });
                            cookie_1.resCookie(res, token, token + '+' + Date.now() + (1000 * 60 * 60 * 24 * 7))
                                .status(200).json({ user });
                        }
                        //////////////////////////////////////////////////////////
                    }
                }
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
const checkToken = () => { };
const checkUser = () => { };
//# sourceMappingURL=me.js.map