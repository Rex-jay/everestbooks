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
//import app from "../../app";
const { app } = require("../../app");
const supertest_1 = __importDefault(require("supertest"));
describe("Post requests", () => {
    it("returns status code 400 for already existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).post("/register").send({
            firstName: "John",
            lastName: "Bobo",
            email: "jay@gmail.com",
            phoneNumber: "081234567889",
            dob: "2022-07-01",
            password: "jeda123456",
            confirmPassword: "jeda123456",
        });
        expect(res.status).toEqual(400);
    }));
    test("should register a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const register = yield (0, supertest_1.default)(app).post("/register").send({
            firstName: "John",
            lastName: "Bobo",
            email: "user@example.com",
            password: "abcdef123",
            confirmPassword: "abcdef123",
            phoneNumber: "081234567889",
            dob: "2022-07-01",
        });
        expect(register.status).toEqual(200);
    }));
    test("should login a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app).post("/login").send({
            email: "user@example.com",
            password: "abcdef123",
        });
        expect(login.status).toEqual(302);
    }));
});
describe("Get requests", () => {
    test("should get status 404 for bad route", () => __awaiter(void 0, void 0, void 0, function* () {
        const routePage = yield (0, supertest_1.default)(app).get("/home");
        expect(routePage.status).toEqual(404);
    }));
    test("should return 401 if user is not logged in", () => __awaiter(void 0, void 0, void 0, function* () {
        const logout = yield (0, supertest_1.default)(app).get("/logout");
        expect(logout.status).toEqual(401);
    }));
    test("should not add authors if user is not logged in", () => __awaiter(void 0, void 0, void 0, function* () {
        const addAuthor = yield (0, supertest_1.default)(app).get("/authors-form");
        expect(addAuthor.status).toEqual(401);
    }));
    test("should not add books if not logged in", () => __awaiter(void 0, void 0, void 0, function* () {
        const addBook = yield (0, supertest_1.default)(app).get("/add-books");
        expect(addBook.status).toEqual(401);
    }));
});
