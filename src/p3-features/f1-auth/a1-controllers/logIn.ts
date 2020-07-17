import {Request, Response} from "express";

export const logIn = async (req: Request, res: Response) => {
    res.status(200).json({test: "ok"});
};
