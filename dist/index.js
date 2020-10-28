"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./p0-config/config");
const app_1 = require("./p2-main/app");
const routes_1 = require("./p2-main/routes");
const app = express_1.default();
app_1.appUse(app);
routes_1.routes(app);
mongoose_1.default.connect(config_1.MONGO_DB_URIS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
    console.log('MongoDB connected successfully!'); // need log always
    app.listen(process.env.PORT, () => {
        console.log('personal-area-back listening on port: ' + process.env.PORT); // need log always
    });
})
    .catch(e => console.error('!!! MongoDB connection error: ', e)); // need log always
process.on('unhandledRejection', (reason, p) => {
    console.error('!!! UnhandledRejection: ', reason, p); // need log always
});
//# sourceMappingURL=index.js.map