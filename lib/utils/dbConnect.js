"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorsDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const url = 'mongodb://localhost:27017/authors-database';
const authorsDatabase = () => {
    mongoose_1.default.connect(url)
        .then(() => {
        console.log('Database connected');
    })
        .catch((error) => console.log(error));
};
exports.authorsDatabase = authorsDatabase;
