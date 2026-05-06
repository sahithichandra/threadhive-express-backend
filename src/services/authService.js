// YOUR CODE HERE
import user from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
async function register(input) {
    const { username, email, password } = input;
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    const newUser = new user({ username, email, password });
    await newUser.save();
    return { message: "User registered successfully" };

}