"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = require('fs');
const bodyParser = require('body-parser');
//const { handleLogin } = require('../controllers/authController')
const registerController_1 = require("../controllers/registerController");
const { addAuthor } = require('../controllers/authorsController');
const { addBook } = require('../controllers/bookController');
const validator_1 = require("../middleware/validator");
const registerController_2 = require("../controllers/registerController");
const bookController_1 = require("../controllers/bookController");
const urlencodedParser = bodyParser.urlencoded({ extended: true });
var router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Authors & Books' });
});
/* GET LOGIN PAGE. */
router.get('/login', function (req, res, next) {
    res.render('login');
});
router.post('/login', registerController_2.loginUserController);
// /* USER LOGIN. */
// router.post('/login', function(req, res, next) {
//   handleLogin(req, res)
//   res.render('login');
// });
//router.get('/login', handleLogin);
/* GET REGISTER PAGE */
router.get('/register', function (req, res, next) {
    res.render('register');
});
router.post('/register', validator_1.validateNewUser, registerController_1.handleNewUser);
/* Register user route */
//router.get('/register', handleNewUser);
// router.post('/register', function(req, res, next) {
//   handleNewUser(req, res);
//   res.render('register');
// });
/* LOGOUT */
router.get('/logout', registerController_1.logoutUserController);
//router.post('/', handleLogin);
/* GET Authors form page. */
router.get('/authors-form', function (req, res, next) {
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
router.get('/addBooks', bookController_1.getAddBooks);
//router.get('/viewBooks')
router.get('/view-books', function (req, res) {
    res.render('view-books', { title: "something" });
});
//**** router.post('/add-book', addBook)
router.patch('/add-book/:id', addBook);
module.exports = router;
