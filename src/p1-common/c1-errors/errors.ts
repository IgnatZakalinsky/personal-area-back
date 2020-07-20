import {IS_DEVELOPER_VERSION} from "../../p0-config/config";
import {Response} from "express";

export const status500 = (res: Response, e: any, inTry: string) => {
    const error = {
        error: "some error: " + e.message,
        errorObject: IS_DEVELOPER_VERSION && {...e},
        in: inTry, // where was error
        info: "Back doesn't know what the error is... ^._.^"
    };
    console.error("!!! Error 500: ", error); // need log always
    res.status(500).json(error)
};
export const status400 = (res: Response, e: string, inTry: string) => {
    const error = {
        error: e,
        in: inTry, // where was error
        info: "Check your request! /ᐠ-ꞈ-ᐟ\\"
    };
    console.error("!!! Error 400: ", error); // need log always
    res.status(400).json(error)
};
