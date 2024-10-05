import { createError } from "../helpers/error.js";
import { createSuccess } from "../helpers/success.js";
import Role from "../models/Role.js" 
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import  jwt  from "jsonwebtoken";
import UserToken from "../models/UserToken.js";
import nodemailer from "nodemailer";

export const register = async (req,res,next) => {
    try {
        // return res.status(200).send("Hello");
        const role = await Role.find({role:"User"});
        const salt = await bcrypt.genSalt(12);//We can give any random number here for generation of salt
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashPassword,
            email: req.body.email,
            roles: role //Referring to User in role table
        });
        // return res.status(200).send(newUser);
        await newUser.save();
        return next(createSuccess(200, "User Registered Successfully!"));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }    
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        .populate("roles","role");        
        if (!user) {
            return next(createError(404, "User not found!"));
        }
        const {roles} = user;
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(400, "Incorrect Password!"));
        }
        const token = jwt.sign(
            {id: user.id, isAdmin: user.isAdmin, roles: roles},
            process.env.JWT_SECRET
        ) 
        res.cookie("access_token",token, {httpOnly: true})
        .status(200)
        .json({
            status: 200,
            message: "Login Success",
            data: user
        });
        // return next(createSuccess(200, "Login Success!"));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}

export const registerAdmin = async (req,res,next) => {
    try {
        const role = await Role.find({});
        const salt = await bcrypt.genSalt(12);//We can give any random number here for generation of salt
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashPassword,
            email: req.body.email,
            isAdmin: true,
            roles: role //Referring to User in role table
        });
        await newUser.save();
        return next(createSuccess(200, "Admin Registered Successfully!"));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }    
}

export const sendEmail = async (req,res,next) => {
    const email = req.body.email;
    const user = await User.findOne({email: {$regex:'^'+email+'$', $options: "i"}});

    if (!user) {
        return next(createError(404, "User Not Found to reset the password"));
    }

    const payload = {
        email: user.email
    }
    const expiryTime = 300;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:expiryTime});

    const newToken = new UserToken({
        userId: user._id,
        token: token
    });

    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "maheshreddy8854@gmail.com",
            pass: "xxofvlrzkruxqntc"
        }
    })

    let mailDetails = {
        from: "maheshreddy8854@gmail.com",
        to: email,
        subject: "Reset Password!",
        // html: `<h1>Password Reset Link</h1>
        // <p>Dear ${user.username},</p>
        // <a href=${process.env.LIVE_URL}/reset/${token}>Reset Password</a>
        // <p>Thank You</p>
        // `,
        html: `<!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Reset Your Password</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                                color: #333;
                            }
                            .container {
                                width: 100%;
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #ffffff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                text-align: center;
                                padding-bottom: 20px;
                            }
                            .header img {
                                max-width: 100px;
                            }
                            .content {
                                text-align: center;
                            }
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                margin-top: 20px;
                                font-size: 16px;
                                color: white !important;
                                background-color: orange;
                                text-decoration: none;
                                border-radius: 5px;
                            }
                            .footer {
                                text-align: center;
                                margin-top: 30px;
                                font-size: 12px;
                                color: #777;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c46c7f62556223.5a945f059c90e.png" alt="Company Logo">
                            </div>
                            <div class="content">
                                <h1>Reset Your Password</h1>
                                <p>Hello ${user.username},</p>
                                <p>We received a request to reset your password. Click the button below to reset it.</p>
                                <a href=${process.env.LIVE_URL}/reset/${token} class="button">Reset Password</a>
                                <p>If you did not request a password reset, please ignore this email.</p>
                            </div>
                            <div class="footer">
                                <p>&copy; 2024 Your Company. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                    </html>

        `

    };

    mailTransporter.sendMail(mailDetails, async(err, data) => {
        if (err) {
            return next(createError(500, "Something Went Wrong while sending the email"));
        } else {
            await newToken.save();
            return next(createSuccess(200, "Email Sent Successfully!"));
        }
    })
}

export const resetPassword = async (req, res,next) => {
    const token = req.body.token;
    const newPassword = req.body.password;
    jwt.verify(token, process.env.JWT_SECRET, async(err, data) => {
        if (err) {
            return next(createError(500, "Reset Link is Expired!"));
        } else {
            const response = data;
            const user = await User.findOne({email: {$regex: '^' + response.email + '$', $options: 'i'}});
            const salt = await bcrypt.genSalt(12);
            const encPassword = await bcrypt.hash(newPassword, salt);
            console.log("Hello");
            user.password = encPassword;
            try {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: user._id},
                    {$set: user},
                    {new: true}
                )
                return next(createSuccess(200, "Password Reset Successfully!"));
            } catch (error) {
                return next(createError(500, "Something went wrong while resetting the password!"));
            }
        }

    })
}

export const getUserDetails = async (req,res,next) => {
    try {
        const userId = req.body.userId;
        const user = await User.findOne({_id: userId});
        return next(createSuccess(200, "User Details Fetched Successfully!", user));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }    
}