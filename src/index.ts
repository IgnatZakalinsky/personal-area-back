import express, {Request, Response} from "express";
import mongoose from "mongoose";
import { log } from "./p1-common/c0-debug/debug";
import {MONGO_DB_URIS, VERSION_1_0} from "./p0-config/config";
import {appUse} from "./p2-main/app";
import auth from "./p3-features/f1-auth";

const app = express();

appUse(app);

// endpoints
app.use(VERSION_1_0 + "/auth", auth);


// ping endpoint
app.use(VERSION_1_0 + "/ping", (req: Request, res: Response) => {
    // wants front time
    res.status(200).json({
        ping: "ok",
        serverTime: new Date().toString(),
        info: "please send me you time —ฅ/ᐠ.̫ .ᐟ\\ฅ—", // https://cutekaomoji.com/animals/cats/
    })
});

//default endpoint for errors
app.use((req: Request, res: Response) => {
    log("!!! Bad url: ", req.method, req.url);
    res.status(404).json({
        error: "bad url /ᐠ｡ꞈ｡ᐟ\\",
        method: req.method,
        url: req.url,
        query: req.query,
        body: req.body,
    });
});

mongoose.connect(MONGO_DB_URIS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
        log("MongoDB connected successfully!");

        app.listen(process.env.PORT, () => {
            log("personal-area-back listening on port: " + process.env.PORT);
        });
    })
    .catch(e => log("!!! MongoDB connection error: ", e));

process.on("unhandledRejection", (reason, p) => {
    log("!!! UnhandledRejection: ", reason, p);
});
