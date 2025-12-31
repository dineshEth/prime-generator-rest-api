import jwt from "jsonwebtoken";
import { conf } from "../conf/conf.js"
import { ApiError } from "../api/error.api.js"
import { getUserById } from "../db/methods.table.js";



async function auth(req,_,next){
    try {
        const token = req.cookies?.accessToken || req.headers["authorization"]?.split(" ").at(1);
        if (!token) {
            return next(new ApiError(401, "Access token missing"));
        }

        const decodedToken = jwt.verify(
            token,
            conf.access_token_secret
        );

        const user = await getUserById(decodedToken._id);
        if (!user) {
            return next(new ApiError(401, "User no longer exists"));
        }

        req.user = user;
        next()
    } catch (error) {
        // If it's already a known ApiError, forward it
        return next(error);
        
        // OR
        // if (error instanceof ApiError) {
        //     return next(error);
        // }
    }
}

export { auth }