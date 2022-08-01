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
exports.getAddBooks = exports.addBook = void 0;
const path = require('path');
const schema_1 = require("../model/schema");
const addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let authorBooks = [{
                bookName: req.body.bookname,
                publishedStatus: req.body.status,
                datePublished: req.body.datepublished,
                serialNumber: req.body.serialnumber,
                createdAt: new Date(),
                updatedAt: new Date()
            }];
        // additional section
        const authorBookSection = yield schema_1.Author.findById(req.params.id);
        console.log(authorBookSection, 'Testing the Microphone');
        if (!authorBookSection)
            return;
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
    }
    catch (err) {
        //res.render('err', {err: err});
        return res.status(400).send(err);
    }
});
exports.addBook = addBook;
const getAddBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //const authorUpdateDisplay = await Author.find().select({name: 1});
    const { id } = req.params;
    console.log(id);
    res.render('addBooks', { id });
});
exports.getAddBooks = getAddBooks;
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
