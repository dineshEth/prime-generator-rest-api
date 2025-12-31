import { insertUser, getUserByEmail } from "../db/methods.table.js";
import { ApiResponse } from "../api/response.api.js";
import { ApiError } from "../api/error.api.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { conf } from "../conf/conf.js";

const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req?.body;
        // validate input
        if (!username || !password || !email) {
            return next(
                new ApiError(400, "Username, email and password are required")
            );
        }
        // validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return next(
                new ApiError(400, "Invalid email format")
            );
        }

        // Check if user already exists in the database with email
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            // Note: login implementation can be done here
            return next(
                new ApiError(409, "User with this email already exists")
            );
        }

        // Hash the password before storing
        const hashPassword = bcrypt.hashSync(password, 10);


        // Store the user in the database
        // database takes time to execute so we use await
        // but in-memory db operations are fast so we can skip await here
        await insertUser(email, username, hashPassword); // await no-effect
        
        // get User for email
        const newUser = await getUserByEmail(email)
        if (!newUser?.id) {
            return next(
                new ApiError(500, "Error creating user")
            );
        }

        // JWT token generation upon successful signup
        const accessToken = jwt.sign(
            { _id: newUser.id, username: newUser.username },
            conf.access_token_secret,
            { expiresIn: conf.access_token_expiry }
        );

        // Send success response
        return res.status(201).json(
                new ApiResponse(
                    201,
                    "User created successfully",
                    {
                        id: newUser.id,
                        username: newUser.username,
                        accessToken
                    }
                )
            );
    } catch (error) {
        return next(error); // already structured, no need to wrap
    }
};

const login = (req, res, next) => {
    try {
        const { email, password } = req.body;
        // validate input
        if (!email || !password) {
            return next(
                new ApiError(400, "Email and password are required")
            );
        }

        // Check if user exists in the database with email
        const user = getUserByEmail(email);
        if (!user) {
            return next(
                new ApiError(404, "User with this email does not exist")
            );
        }

        // Verify the password
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return next(
                new ApiError(401, "Incorrect password")
            );
        }

        // JWT token generation upon successful login
        const accessToken = jwt.sign(
            { _id: user.id, username: user.username },
            conf.access_token_secret,
            { expiresIn: conf.access_token_expiry }
        );

        // Send success response
        return res.status(200).json(
                new ApiResponse(
                    200,
                    "Login successful",
                    {
                        id: user.id,    
                        username: user.username,
                        accessToken
                    }
                )
            );
    } catch (error) {
        return next(error); // already structured, no need to wrap
    }
};

export { signup, login };