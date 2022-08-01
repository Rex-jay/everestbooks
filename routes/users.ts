const res = require('express/lib/response');
import express, {Express, Request, Response } from 'express';
const router = express.Router();
const fs = require('fs');
import path from "path";
import { addAuthor, getAuthors, getUpdateAuthors, updateAuthors, deleteAuthor } from '../controllers/authorsController';
import { validateUser } from '../middleware/validator';
//import {verifyLogin} from '../middleware/validator'
//const {buildTable} = require('./views/users')



router.get('/', validateUser, getAuthors)
//router.post('/', addAuthor)

//UPDATE
router.get('/:id', getUpdateAuthors)
router.patch('/:id', updateAuthors)

//DELETE
router.delete('/:id', deleteAuthor)


/* EDIT AUTHORS */
router.get('/edit_authors', function(req, res, next) {
  res.render('edit_authors');
});



module.exports = router;

