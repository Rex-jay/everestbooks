import {ILogin, IAuthor, ILogginIn} from "../model/model"
import { User, Author } from "../model/schema"
import { generateToken } from "./validator";
import bcrypt from 'bcrypt';

export const checkUser =  async(user: ILogin)=>{
    const userEmail = await User.findOne({email: user.email});
    console.log(userEmail, "############")
    return userEmail;
}

export const checkAuthor = async(author: IAuthor) => {
    const authorName = await Author.findOne({name: author.name});
    return authorName;
}

export const loginFunction = async(user: ILogin)=>{
    try{
        let userDetails = await checkUser(user);
        console.log(userDetails, "**********");
        if(!userDetails){
            throw new Error(`Email or password incorrect`);
        }
        console.log()
        let truthy = await bcrypt.compare(user.password, userDetails.password);
        console.log(truthy, "truth")
            if(truthy){
                const LoggedInUser: ILogginIn = {
                    token: generateToken({id: userDetails.id, email: userDetails.email}),
                   email: userDetails.email
                }
                console.log(LoggedInUser);
                return LoggedInUser;
            }
    } catch(error){
        throw new Error('Email or password mismatch');
    }
}

