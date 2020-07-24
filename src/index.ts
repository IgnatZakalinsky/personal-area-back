import express, {Request, Response} from "express";
import mongoose from "mongoose";
import {MONGO_DB_URIS, VERSION_1_0} from "./p0-config/config";
import {appUse} from "./p2-main/app";
import auth from "./p3-features/f1-auth";

const app = express();

appUse(app);

// endpoints
app.use(VERSION_1_0 + "/auth", auth);


// ping endpoint
app.use(VERSION_1_0 + "/ping", (req: Request, res: Response) => {
    // save statistic
    const backTime = new Date().getTime();
    const frontTime = req.body.frontTime || backTime;
    const ping = backTime - frontTime;
    console.warn("!!! PING: ", ping); // need log always

    res.cookie('token', "test token", {
        expires: new Date(Date.now() + 8640000),
        secure: false, // set to true if your using https
        httpOnly: true,
    }).status(200).json({
        ping,
        backTime,
        frontTime,
        info: "please send me you time —ฅ/ᐠ.̫ .ᐟ\\ฅ—", // https://cutekaomoji.com/animals/cats/
    })
});

//default endpoint for errors
app.use((req: Request, res: Response) => {
    console.error("!!! Bad url: ", req.method, req.url); // need log always
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
        console.log("MongoDB connected successfully!"); // need log always

        app.listen(process.env.PORT, () => {
            console.log("personal-area-back listening on port: " + process.env.PORT); // need log always
        });
    })
    .catch(e => console.error("!!! MongoDB connection error: ", e)); // need log always

process.on("unhandledRejection", (reason, p) => {
    console.error("!!! UnhandledRejection: ", reason, p); // need log always
});
