import {Response, Request, NextFunction} from 'express';
import Joi, {string} from 'joi';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
import { JWT_SECRET } from "../env";
import { User } from "../model/schema"
import { ILogginToken } from '../model/model';

export const validateNewUser = (req: Request, res: Response, next: NextFunction) => {
    let {firstname, lastname, email, password, phone, repeat_pwd} = req.body;
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().min(3).max(255).required().email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'dev', 'org']}}),
        password: Joi.string().min(5).max(1024).required(),
        repeat_pwd: Joi.ref('password'),
        phone: Joi.string().required()
    })
    const {error, value} = schema.validate({firstname, lastname, email, password, phone, repeat_pwd})
    if(error){
        throw new Error(error.message)
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(value.password, salt);
    req.body.password = hash;
    req.body.email = value.email;
    next()
}

// create JWTs
export const generateToken = (props: ILogginToken)=>{
    return jwt.sign({props}, `${JWT_SECRET}`);
    //return token;
}

// export function verifyLogin(req: Request, res: Response, next: NextFunction){
//     const token = generateToken(req.body.token);
//     if(!token){
//         next();
//         return;
//     }
// }

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const decoded = jwt.verify(req.cookies.token, `${JWT_SECRET}`);
        console.log(decoded, "Decoded authors")
        const user = await User.findOne({email: decoded.props.email});
        console.log(user, "@@@@@@@@");
        if(user){
            next();
        } else {
            res.status(401).send("Unauthorized")
        }
    } catch(error){
        //throw new Error('No permission');
        res.render('login');
    }
}
