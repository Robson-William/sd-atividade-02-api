import { getGoogleUser } from "./getUser.js";
import jwt from "jsonwebtoken";

export const login = async(req, res) => {
    try {
        const user = getGoogleUser(access_token);

        const token = await jwt.sign(user.id, process.env.JWT_SECRET, {expiresIn: "1d"})

        req.session.user = user;

        const tokenBearer = `Bearer ${token}`;
        res.cookie("access_token", tokenBearer, {maxAge: 3600000});
        res.set("Authorization", tokenBearer);
		res.redirect("/livros");
    } catch(err) {
        console.log(err)
    }
}

export const logout = async(req, res) => {
    req.session.destroy();

    res.clearCookie("access_token");
    res.redirect("/");
}

export const locals = (req, res, next) => {
    res.locals.user = req.session.user;
    next();
}

export const authenticate = async(req, res, next) => {
    const {access_token} = req.cookies;

    if (access_token){
        try {
            const [, token] = access_token.split(" ");

            await jwt.verify(token, process.env.JWT_SECRET);

            return next();
        } catch(err){
            console.log(err);
            res.redirect("/");
        }
    } else {
        req.session.user = null;
        return res.redirect("/login")
    }
}