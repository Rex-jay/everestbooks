import express, {Express, Request, Response } from 'express';
const bcrypt = require("bcrypt");
import { User } from '../model/schema';
const Joi = require('joi');
const jwt = require('jsonwebtoken');
import { JWT_SECRET } from "../env";
import { generateToken} from "../middleware/validator"
import { checkUser } from '../middleware/userService';


// export const handleLogin = async(req: Request, res: Response) => {
//     try{

//         let user = await User.findOne({email: req.body.email});
//         if(!user) {
//             return res.status(401).send('Invalid email or password')
//         }
        
//         //evaluate password
//         let validPassword = await bcrypt.compare(req.body.password, user.password);
//         if(validPassword){
//             const token = generateToken(user.id);
//             return res.redirect('/users')
//         }
        
//     } catch(err){
//         return res.status(400).send('Email or password incorrect')
//     }
// }