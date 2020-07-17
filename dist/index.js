"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = require("./p1-common/c0-debug/debug");
const config_1 = require("./p0-config/config");
const app_1 = require("./p2-main/app");
const f1_auth_1 = __importDefault(require("./p3-features/f1-auth"));
const app = express_1.default();
app_1.appUse(app);
// endpoints
app.use(config_1.VERSION_1_0 + "/auth", f1_auth_1.default);
// ping endpoint
app.use(config_1.VERSION_1_0 + "/ping", (req, res) => {
    // wants front time
    res.status(200).json({
        ping: "ok",
        serverTime: new Date().toString(),
        info: "please send me you time —ฅ/ᐠ.̫ .ᐟ\\ฅ—",
    });
});
//default endpoint for errors
app.use((req, res) => {
    debug_1.log("!!! Bad url: ", req.method, req.url);
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
    debug_1.log("MongoDB connected successfully!");
    app.listen(process.env.PORT, () => {
        debug_1.log("personal-area-back listening on port: " + process.env.PORT);
    });
})
    .catch(e => debug_1.log("!!! MongoDB connection error: ", e));
process.on("unhandledRejection", (reason, p) => {
    debug_1.log("!!! UnhandledRejection: ", reason, p);
});
//# sourceMappingURL=index.js.map