import express, {Express, Request, Response } from 'express';
import path from "path";
const fs = require('fs');
const bodyParser = require('body-parser');
//const { handleLogin } = require('../controllers/authController')
import { handleNewUser, logoutUserController} from '../controllers/registerController'
const { addAuthor } = require('../controllers/authorsController')
const { addBook } = require('../controllers/bookController')
import {validateNewUser, validateUser} from "../middleware/validator"
//const registerController = require('../controllers/registerController');
//var express = require('express');
import flush from 'connect-flash';
import { loginUserController } from '../controllers/registerController';
import { getAddBooks } from '../controllers/bookController';

const urlencodedParser = bodyParser.urlencoded({extended: true})
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Authors & Books' });
});



/* GET LOGIN PAGE. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', loginUserController);

// /* USER LOGIN. */
// router.post('/login', function(req, res, next) {
//   handleLogin(req, res)
//   res.render('login');
// });

//router.get('/login', handleLogin);


/* GET REGISTER PAGE */
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', validateNewUser, handleNewUser);


/* Register user route */
//router.get('/register', handleNewUser);

// router.post('/register', function(req, res, next) {
//   handleNewUser(req, res);
//   res.render('register');
// });

/* LOGOUT */
router.get('/logout', logoutUserController)
//router.post('/', handleLogin);

/* GET Authors form page. */
router.get('/authors-form', function(req, res, next) {
  res.render('authors-form');
});

router.post('/authors-form', addAuthor);

/* BOOK ROUTE */
// router.get('/add-book', function(req, res, next) {
//   res.render('view-books');
// });

//****** */ router.get('/addBooks', function(req, res, next) {
//   res.render('addBooks');
// });
router.get('/addBooks', getAddBooks);

//router.get('/viewBooks')
router.get('/view-books', function(req, res) {
  res.render('view-books', {title: "something"});
});

//**** router.post('/add-book', addBook)
router.patch('/add-book/:id', addBook)

module.exports = router;
