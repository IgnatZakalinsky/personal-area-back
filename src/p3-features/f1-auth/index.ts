import express from "express";
import { logIn } from "./a1-controllers/logIn";

const auth = express.Router();

// auth.get('/', getUsersForDev); // for developers

auth.post("/login", logIn);

export default auth;
