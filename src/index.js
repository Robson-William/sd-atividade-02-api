import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {router} from "./router.js";
import { config } from 'dotenv';

// Configurando dotenv
config();

const app = express();

app.use(cookieParser());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000}
}))

app.use(router);

app.listen(3000, console.log("Api rodando na porta 8000"));