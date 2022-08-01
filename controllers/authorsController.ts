import express, {Express, NextFunction, Request, Response } from 'express';
import { checkAuthor, checkUser } from '../middleware/userService';
const path = require('path');
import { Author } from '../model/schema';


export const addAuthor = async(req: Request, res: Response, next: NextFunction) => {
    try{
        let authorExist = await checkAuthor(req.body);
        if(authorExist){
            throw new Error('Author already exists');
        }

        const newAuthor = new Author({
            name: req.body.name,
            age: req.body.age,
            address: req.body.address,
            createdAt: new Date(),
        })
        const author = await newAuthor.save();
        console.log(author);
        //res.render('users', {author: newAuthor})
        //return res.status(200).send("Author added successfully");
        return res.redirect('/users')
    } catch(err){
        //res.render('err', {err: err});
        return res.status(400).send(err);
    }
}

export const getAuthors = async (req: Request, res: Response, next: NextFunction) => {
    const authorDisplay = await Author.find().select({name: 1});
    console.log(authorDisplay, "Authors display");
    res.render('users', {details: authorDisplay});
}

export const updateAuthors = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const author = await Author.findById(req.params.id);
        if(!author) return;
        author.name = req.body.name;
        author.age = req.body.age;
        author.address = req.body.address;
        author.updatedAt = new Date();
        
        author.save();
        //console.log(updatedAuthor);
        return res.redirect('/users')
    } catch(err) {
        return res.status(400).send({err: "Author not found"})
    }
}

export const getUpdateAuthors = async (req: Request, res: Response, next: NextFunction) => {
    //const authorUpdateDisplay = await Author.find().select({name: 1});
    const {id} = req.params
    console.log(id)
    res.render('editAuthor', {id});
}


export const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const author: any = await Author.findById(req.params.id);
        await author.remove();
        return res.redirect('/users');
    } catch(err){
        return res.status(400).send({err: "Author not found"})
    }
}

// export const checkAuthor = async(author: IAuthor) => {
//     const authorName = await Author.find({name: author.name});
//     return authorName;
// }