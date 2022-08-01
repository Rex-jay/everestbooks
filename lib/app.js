"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const createError = require('http-errors');
//var express = require('express');
const path_1 = __importDefault(require("path"));
//const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const express_session_1 = __importDefault(require("express-session"));
const connect_flash_1 = __importDefault(require("connect-flash"));
//const flush = require('connect-flash');
const dbConnect_1 = require("./utils/dbConnect");
const method_override_1 = __importDefault(require("method-override"));
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dotENV = dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3006;
// view engine setup
//app.set('views', path.join('/Users/dec/Documents/PROJECTS/week-6-pod_b-node-sq011-Rex-jay/', '/src/views'));
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use((0, express_session_1.default)({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use((0, connect_flash_1.default)());
app.use((0, method_override_1.default)('_method'));
// app.use((err: any, req: Request, res: Response, next: any) => {
//   res.locals.message = req.flash('message');
//   next();
// });
// app.use((err: any, req: Request, res: Response, next: any) => {
//   res.locals.errors = req.flash("error");
//   res.locals.successes = req.flash("success");
//   next();
// });
app.use('/', indexRouter);
app.use('/authors-form', indexRouter);
app.use('/users', usersRouter);
//app.use('/authors-form', usersRouter);
app.use('/users/edit_authors', indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// app.use((req, res, next)=> {
//   console.log({ip, computerdetails, route});
//   next();
// })
//error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
//Connecting to database
(0, dbConnect_1.authorsDatabase)();
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
module.exports = app;
//"start": "node ./bin/www"
