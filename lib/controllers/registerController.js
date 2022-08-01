"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUserController = exports.loginUserController = exports.handleNewUser = void 0;
const userService_1 = require("../middleware/userService");
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const schema_1 = require("../model/schema");
const userService_2 = require("../middleware/userService");
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
const handleNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userExist = yield (0, userService_1.checkUser)(req.body);
        if (userExist) {
            throw new Error('User already exists');
        }
        //encrypt the password
        //const hashedPwd = await bcrypt.hash(req.body.pwd, 10);
        const newUser = new schema_1.User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            DOB: req.body.dob,
            email: req.body.email,
            phoneNumber: req.body.phone,
            password: req.body.password,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const result = yield newUser.save();
        //req.flash('message', 'User created successfully')
        //res.redirect('/register');
        res.render('login');
        //return res.status(200).send("User created successfully");
    }
    catch (err) {
        return res.status(400).send("Please provide valid information");
    }
});
exports.handleNewUser = handleNewUser;
const loginUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userService_2.loginFunction)(req.body);
    console.log(user);
    if (user) {
        res.cookie('token', user.token);
        res.cookie('email', user.email);
        //res.render('users', getAuthors)
        res.redirect('/users');
    }
});
exports.loginUserController = loginUserController;
const logoutUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('token', '');
    res.cookie('email', '');
    res.render('login');
});
exports.logoutUserController = logoutUserController;
