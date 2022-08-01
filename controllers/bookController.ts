import express, {Express, NextFunction, Request, Response } from 'express';
import { checkAuthor, checkUser } from '../middleware/userService';
const path = require('path');
import mongoose from 'mongoose';
import { Author } from '../model/schema';

export const addBook = async(req: Request, res: Response, next: NextFunction) => {
    try{

        let authorBooks = [{
            bookName: req.body.bookname,
            publishedStatus: req.body.status,
            datePublished: req.body.datepublished,
            serialNumber: req.body.serialnumber,
            createdAt: new Date(),
            updatedAt: new Date()
        }]

        // additional section
        const authorBookSection = await Author.findById(req.params.id);
        console.log(authorBookSection, 'Testing the Microphone')
        if(!authorBookSection) return;

        authorBookSection.books = authorBooks;

        authorBookSection.save();
        /////////////////////////////////

        // Author.updateOne(
        //     {_id: req.params.id},
        //     {$push: {books: authorBooks}} 
        // )

        //res.render('users', {author: newAuthor})
        return res.status(200).send("Book added successfully");
        //return res.redirect('/users')
    } catch(err){
        //res.render('err', {err: err});
        return res.status(400).send(err);
    }
}

export const getAddBooks = async (req: Request, res: Response, next: NextFunction) => {
    //const authorUpdateDisplay = await Author.find().select({name: 1});
    const {id} = req.params
    console.log(id)
    res.render('addBooks', {id});
}
// export const updateAuthors = async (req: Request, res: Response, next: NextFunction) => {
//     try{
//         const author = await Author.findById(req.params.id);
//         if(!author) return;
//         author.name = req.body.name;
//         author.age = req.body.age;
//         author.address = req.body.address;
//         author.updatedAt = new Date();
        
//         author.save();
//         //console.log(updatedAuthor);
//         return res.redirect('/users')
//     } catch(err) {
//         return res.status(400).send({err: "Author not found"})
//     }
// }

// var objFriends = { fname:"fname",lname:"lname",surname:"surname" };
// Friend.findOneAndUpdate(
//    { _id: req.body.id }, 
//    { $push: { friends: objFriends  } },
//   function (error, success) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log(success);
//         }
//     });
// )

// PersonModel.update(
//     { _id: person._id }, 
//     { $push: { friends: friend } },
//     done
// );
