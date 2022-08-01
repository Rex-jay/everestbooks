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
exports.deleteAuthor = exports.getUpdateAuthors = exports.updateAuthors = exports.getAuthors = exports.addAuthor = void 0;
const userService_1 = require("../middleware/userService");
const path = require('path');
const schema_1 = require("../model/schema");
const addAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let authorExist = yield (0, userService_1.checkAuthor)(req.body);
        if (authorExist) {
            throw new Error('Author already exists');
        }
        const newAuthor = new schema_1.Author({
            name: req.body.name,
            age: req.body.age,
            address: req.body.address,
            createdAt: new Date(),
        });
        const author = yield newAuthor.save();
        console.log(author);
        //res.render('users', {author: newAuthor})
        //return res.status(200).send("Author added successfully");
        return res.redirect('/users');
    }
    catch (err) {
        //res.render('err', {err: err});
        return res.status(400).send(err);
    }
});
exports.addAuthor = addAuthor;
const getAuthors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorDisplay = yield schema_1.Author.find().select({ name: 1 });
    console.log(authorDisplay, "Authors display");
    res.render('users', { details: authorDisplay });
});
exports.getAuthors = getAuthors;
const updateAuthors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = yield schema_1.Author.findById(req.params.id);
        if (!author)
            return;
        author.name = req.body.name;
        author.age = req.body.age;
        author.address = req.body.address;
        author.updatedAt = new Date();
        author.save();
        //console.log(updatedAuthor);
        return res.redirect('/users');
    }
    catch (err) {
        return res.status(400).send({ err: "Author not found" });
    }
});
exports.updateAuthors = updateAuthors;
const getUpdateAuthors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //const authorUpdateDisplay = await Author.find().select({name: 1});
    const { id } = req.params;
    console.log(id);
    res.render('editAuthor', { id });
});
exports.getUpdateAuthors = getUpdateAuthors;
const deleteAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = yield schema_1.Author.findById(req.params.id);
        yield author.remove();
        return res.redirect('/users');
    }
    catch (err) {
        return res.status(400).send({ err: "Author not found" });
    }
});
exports.deleteAuthor = deleteAuthor;
// export const checkAuthor = async(author: IAuthor) => {
//     const authorName = await Author.find({name: author.name});
//     return authorName;
// }
