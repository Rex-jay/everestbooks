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
exports.validateUser = exports.generateToken = exports.validateNewUser = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = require('jsonwebtoken');
const env_1 = require("../env");
const schema_1 = require("../model/schema");
const validateNewUser = (req, res, next) => {
    let { firstname, lastname, email, password, phone, repeat_pwd } = req.body;
    const schema = joi_1.default.object({
        firstname: joi_1.default.string().required(),
        lastname: joi_1.default.string().required(),
        email: joi_1.default.string().min(3).max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'org'] } }),
        password: joi_1.default.string().min(5).max(1024).required(),
        repeat_pwd: joi_1.default.ref('password'),
        phone: joi_1.default.string().required()
    });
    const { error, value } = schema.validate({ firstname, lastname, email, password, phone, repeat_pwd });
    if (error) {
        throw new Error(error.message);
    }
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(value.password, salt);
    req.body.password = hash;
    req.body.email = value.email;
    next();
};
exports.validateNewUser = validateNewUser;
// create JWTs
const generateToken = (props) => {
    return jwt.sign({ props }, `${env_1.JWT_SECRET}`);
    //return token;
};
exports.generateToken = generateToken;
// export function verifyLogin(req: Request, res: Response, next: NextFunction){
//     const token = generateToken(req.body.token);
//     if(!token){
//         next();
//         return;
//     }
// }
const validateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jwt.verify(req.cookies.token, `${env_1.JWT_SECRET}`);
        console.log(decoded, "Decoded authors");
        const user = yield schema_1.User.findOne({ email: decoded.props.email });
        console.log(user, "@@@@@@@@");
        if (user) {
            next();
        }
        else {
            res.status(401).send("Unauthorized");
        }
    }
    catch (error) {
        //throw new Error('No permission');
        res.render('login');
    }
});
exports.validateUser = validateUser;
