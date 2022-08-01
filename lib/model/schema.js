"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Author = exports.authorSchema = void 0;
//import {mongo} from "mongoose";
const mongoose_1 = __importDefault(require("mongoose"));
exports.authorSchema = new mongoose_1.default.Schema({
    name: String,
    age: String,
    address: String,
    books: [{ bookName: String,
            publishedStatus: String,
            datePublished: Date,
            serialNumber: Number,
            createdAt: Date,
            updatedAt: Date
        }],
    createdAt: Date,
    updatedAt: Date
});
// export const bookSchema = new mongoose.Schema({
//     authorId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Author'
//     },
// bookName: String,
// publishedStatus: String,
// datePublished: Date,
// serialNumber: Number,
// createdAt: Date,
// updatedAt: Date
// })
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    DOB: Date,
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    password: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: Date
});
exports.Author = mongoose_1.default.model('Author', exports.authorSchema);
//export const Book = mongoose.model('Book', bookSchema);
exports.User = mongoose_1.default.model('User', userSchema);
// Users collection for authentication and authorization
// - firstName
// - lastname
// - DOB
// - email (unique)
// - phone number (unique)
// - createdAt
// - updatedAt
// export const restaurantSchema = new mongoose.Schema({
//     address: {String},
//     borough: String,
//     cuisine: String,
//     grades: {String},
//     name: String,
//     restaurant_id: String
// })
// const getUsers = async () => {
//     const users = await User.find()
//     //.select({email: 1})
//     console.log(users);
// }
// getUsers();
// export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
// const yesman = async() => {
//     //const reg_contain = await Restaurant.find().or([{borough: 'Staten Island'}, {borough: 'Queens'}, {borough: 'Bronxor Brooklyn'}]);
//     const reg_contain = await Restaurant.find({cuisine: {$nin: ['American', 'Chinese']}, name: /^Wil/i}).select({borough: 1, cuisine: 1, name: 1, restaurant_id: 1});
//     console.log(reg_contain);
// }
// yesman();
// Course
// .find({ isPublished: true})
// .or([
//     {price: {$gte: 15}},
//     {name: /.*by.*/i}
// ])
