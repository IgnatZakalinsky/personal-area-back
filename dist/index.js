"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./p0-config/config");
const app_1 = require("./p2-main/app");
const f1_auth_1 = __importDefault(require("./p3-features/f1-auth"));
const app = express_1.default();
app_1.appUse(app);
// endpoints
app.use(config_1.VERSION_1_0 + "/auth", f1_auth_1.default);
// ping endpoint
app.use(config_1.VERSION_1_0 + "/ping", (req, res) => {
    // save statistic
    const backTime = new Date().getTime();
    const frontTime = req.body.frontTime || backTime;
    const ping = backTime - frontTime;
    console.warn("!!! PING: ", ping); // need log always
    res.cookie('token', "test token", {
        expires: new Date(Date.now() + 8640000),
        secure: false,
        httpOnly: true,
    }).status(200).json({
        ping,
        backTime,
        frontTime,
        info: "please send me you time —ฅ/ᐠ.̫ .ᐟ\\ฅ—",
    });
});
//default endpoint for errors
app.use((req, res) => {
    console.error("!!! Bad url: ", req.method, req.url); // need log always
    res.status(404).json({
        error: "bad url /ᐠ｡ꞈ｡ᐟ\\",
        method: req.method,
        url: req.url,
        query: req.query,
        body: req.body,
    });
});
mongoose_1.default.connect(config_1.MONGO_DB_URIS, {
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
//# sourceMappingURL=index.js.map