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
exports.logIn = void 0;
const errors_1 = require("../../../p1-common/c1-errors/errors");
exports.logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.token) {
        if (req.body.token.charAt(1) === "4")
            errors_1.status400(res, "test 400", "login");
        if (req.body.token.charAt(1) === "5")
            errors_1.status500(res, { message: "test 400" }, "login");
        else
            res.status(200).json({ token: "ok" });
        return;
    }
    res.status(200).json({ test: "ok" });
});
//# sourceMappingURL=logIn.js.map