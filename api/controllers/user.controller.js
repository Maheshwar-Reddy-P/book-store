import { createError } from "../helpers/error.js"
import { createSuccess } from "../helpers/success.js";
import User from "../models/User.js";

export const getAllUsers = async (req,res,next) => {
    try {
        const users = await User.find({});
        return next(createSuccess(200,"All Users",users));
    } catch (error) {
        return next(createError(500,"Internal Server Error!"));
    }
}

export const getUserById = async (req,res,next) => {
    try {
        const user = await User.findById({_id:req.params.id});
        if (!user) {
            return next(createError(404,"User Not Found"));
        }
        return next(createSuccess(200,"User ", user));
    } catch (error) {
        return next(createError(500,"Internal Server Error!"));
    }
}