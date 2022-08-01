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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginFunction = exports.checkAuthor = exports.checkUser = void 0;
const schema_1 = require("../model/schema");
const validator_1 = require("./validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const checkUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = yield schema_1.User.findOne({ email: user.email });
    console.log(userEmail, "############");
    return userEmail;
});
exports.checkUser = checkUser;
const checkAuthor = (author) => __awaiter(void 0, void 0, void 0, function* () {
    const authorName = yield schema_1.Author.findOne({ name: author.name });
    return authorName;
});
exports.checkAuthor = checkAuthor;
const loginFunction = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userDetails = yield (0, exports.checkUser)(user);
        console.log(userDetails, "**********");
        if (!userDetails) {
            throw new Error(`Email or password incorrect`);
        }
        console.log();
        let truthy = yield bcrypt_1.default.compare(user.password, userDetails.password);
        console.log(truthy, "truth");
        if (truthy) {
            const LoggedInUser = {
                token: (0, validator_1.generateToken)({ id: userDetails.id, email: userDetails.email }),
                email: userDetails.email
            };
            console.log(LoggedInUser);
            return LoggedInUser;
        }
    }
    catch (error) {
        throw new Error('Email or password mismatch');
    }
});
exports.loginFunction = loginFunction;
