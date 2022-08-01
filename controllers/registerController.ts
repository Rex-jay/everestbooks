import express, {Express, NextFunction, Request, Response } from 'express';
import { checkUser } from '../middleware/userService';

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

import {User} from '../model/schema';
import { loginFunction } from '../middleware/userService'

import { getAuthors } from './authorsController'


// const userDB = {
//     users: require('../../users.json'),
//     setUsers: function (data: any) {this.users = data}
// }



// const handleNewUser = async(req: Request, res: Response) => {
//     let {email, pwd} = req.body;
//     if(!email || !pwd) return res.status(400).json({'message': 'email and password are required'});

//     // check for duplicate usernames in the db
//     const duplicate = userDB.users.find((person: any) => {person.email === email});
//     if(duplicate) return res.status(409).send(409); //confllict - removed Status
//     try{
//         //encrypt the password
//         const hashedPwd = await bcrypt.hash(pwd, 10);
//         //store the new user
//         //const newUser = {'username': user, "password": hashedPwd};
//         const newUser = {...req.body, "password": hashedPwd};
//         userDB.setUsers([...userDB.users, newUser]);
//         await fsPromises.writeFile(
//             path.join(__dirname, '../../users.json'),
//             JSON.stringify(userDB.users, null, 1)
//         );
//         console.log(userDB.users);
//         return res.status(201).json({'success': `New user ${email} created!`})
//     } catch(err: any){
//         return res.status(500).json({'message': err.message});
//     }
// }

export const handleNewUser = async(req: Request, res: Response, next: NextFunction) => {
    try{
        let userExist = await checkUser(req.body);
        if(userExist){
            throw new Error('User already exists');
        }
        //encrypt the password
        //const hashedPwd = await bcrypt.hash(req.body.pwd, 10);

        const newUser = new User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            DOB: req.body.dob,
            email: req.body.email,
            phoneNumber: req.body.phone,
            password: req.body.password,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const result = await newUser.save();
        //req.flash('message', 'User created successfully')
        //res.redirect('/register');
        res.render('login');
        //return res.status(200).send("User created successfully");
    } catch(err){
        return res.status(400).send("Please provide valid information");
    }
}

export const loginUserController = async(req: Request, res: Response, next: NextFunction) => {
    const user = await loginFunction(req.body);
    console.log(user);
    if(user){
        res.cookie('token', user.token);
        res.cookie('email', user.email);
        //res.render('users', getAuthors)
        res.redirect('/users');
    }
}

export const logoutUserController = async(req: Request, res: Response, next: NextFunction) => {
    res.cookie('token', '');
    res.cookie('email', '');
    res.render('login');
}