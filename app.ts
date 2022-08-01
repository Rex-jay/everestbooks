import express, {Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const createError = require('http-errors');
//var express = require('express');
import path from "path";
//const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
import session from 'express-session';
import flash from 'connect-flash';
//const flush = require('connect-flash');
import { authorsDatabase } from './utils/dbConnect';
import methodOverride from 'method-override'

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const dotENV = dotenv.config();

const app = express();
const port = 3006;

// view engine setup
//app.set('views', path.join('/Users/dec/Documents/PROJECTS/week-6-pod_b-node-sq011-Rex-jay/', '/src/views'));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: 'secret',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(methodOverride('_method'))

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
app.use('/authors-form', indexRouter)
app.use('/users', usersRouter);
//app.use('/authors-form', usersRouter);
app.use('/users/edit_authors', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// app.use((req, res, next)=> {
//   console.log({ip, computerdetails, route});
//   next();
// })

//error handler
app.use(function(err: any, req: Request, res: Response, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Connecting to database
authorsDatabase();



app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})

module.exports = app;


   //"start": "node ./bin/www"