"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMapItems = void 0;
const getMapItemsLogic_1 = require("../p2-bll/getMapItemsLogic");
const errors_1 = require("../../../p1-common/c1-errors/errors");
exports.getMapItems = (req, res) => {
    getMapItemsLogic_1.getMapItemsLogic()
        .then(answer => {
        switch (answer.type) {
            case 200: {
                res.status(200).json({
                    mapItems: answer.mapItems,
                    mapItemsTotalCount: answer.mapItemsTotalCount
                });
                break;
            }
            case 500: {
                errors_1.status500(res, answer.error.e, answer.error.inTry, answer.error.more);
                break;
            }
            case 400: {
                errors_1.status400(res, answer.error.e, answer.error.inTry, answer.error.more);
                break;
            }
        }
    })
        .catch(e => errors_1.status500(res, e, 'getMapItems'));
};
//# sourceMappingURL=getMapItems.js.map