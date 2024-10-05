import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import bookRoute from './routes/book.js';
import cors from 'cors';
import User from './models/User.js';
import cookieParser from 'cookie-parser';
import { seedBooksData } from './seed.js';
const app = express();
dotenv.config();

//Middlewares
app.use(express.json());//accepts in json format
app.use(cors());
app.use(cookieParser()); //To use cookies
app.use('/api/role',roleRoute);
app.use('/api/auth', authRoute);
app.use('/api/user',userRoute);
app.use('/api/books',bookRoute);

//Response Handler Middleware
app.use((obj,req,res,next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong";
    res.status(statusCode).json({
        success: [200,201,204].some(code => code === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    });
});

// Error handler middleware
// app.use((err, req, res, next) => {
//     const statusCode = err.status || 500;
//     const errorMessage = err.message || "Something went Wrong";
//     res.status(statusCode).json({
//         success: false,
//         status: statusCode,
//         message: errorMessage,
//         stack: err.stack
//     });
// });

//DB Connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        if (process.argv.includes("--seed")) {
            await seedBooksData();
        }
        console.log("Connected to Database");
    }
    catch (error) {
        throw error;
    }
}

app.listen(8854, () => {
    connectMongoDB();
    console.log("Connected to Backend");
})