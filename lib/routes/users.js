"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const res = require('express/lib/response');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const fs = require('fs');
const authorsController_1 = require("../controllers/authorsController");
const validator_1 = require("../middleware/validator");
//import {verifyLogin} from '../middleware/validator'
//const {buildTable} = require('./views/users')
router.get('/', validator_1.validateUser, authorsController_1.getAuthors);
//router.post('/', addAuthor)
//UPDATE
router.get('/:id', authorsController_1.getUpdateAuthors);
router.patch('/:id', authorsController_1.updateAuthors);
//DELETE
router.delete('/:id', authorsController_1.deleteAuthor);
/* EDIT AUTHORS */
router.get('/edit_authors', function (req, res, next) {
    res.render('edit_authors');
});
module.exports = router;
