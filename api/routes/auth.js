import express from 'express';
import { getUserDetails, login, register, registerAdmin, resetPassword, sendEmail } from '../controllers/auth.controller.js';

const router = express.Router();

//register
router.post('/register', register);

//login
router.post('/login', login);

//Register as admin 
router.post('/register-admin', registerAdmin);

//Sending Email For Forget Password
router.post('/send-email', sendEmail);

//reset password
router.post('/reset-password', resetPassword);

//user details
router.post('/user-details', getUserDetails);


export default router;