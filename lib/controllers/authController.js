"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const Joi = require('joi');
const jwt = require('jsonwebtoken');
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
