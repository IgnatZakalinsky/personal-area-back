import {Request, Response} from "express";
import {status400, status500} from "../../../p1-common/c1-errors/errors";

export const logIn = async (req: Request, res: Response) => {
    if (req.body.token) {
        if (req.body.token.charAt(1) === "4") status400(res, "test 400", "login");
        if (req.body.token.charAt(1) === "5") status500(res, {message: "test 400"}, "login");
        else res.status(200).json({token: "ok"});
        return;
    }
    res.status(200).json({test: "ok"});
};