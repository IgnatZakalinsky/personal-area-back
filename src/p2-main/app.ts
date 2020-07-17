import {Express, NextFunction, Request, Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {log} from "../p1-common/c0-debug/debug";

export const appUse = (app: Express) => {
    app.use(cors());
    app.use(cookieParser());

    // parse application/json
    app.use(bodyParser.json({limit: "7mb"}));
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({limit: "7mb", extended: false}));

    // log middleware
    app.use((req: Request, res: Response, next: NextFunction) => {
        log("Time: ", new Date().toString());
        log(req.method, req.url, "params: ", req.params);
        log("query:", req.query);
        log("body:", req.body);
        log("cookies:", req.cookies);
        // log("headers:", req.headers);
        // log("rawHeaders:", req.rawHeaders);
        next();
    });
};
