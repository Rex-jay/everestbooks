//import app from "../../app";
const {app} = require("../../app")
import request from "supertest";
describe("Post requests", () => {
    it("returns status code 400 for already existing user", async () => {
        const res = await request(app).post("/register").send({
            firstName: "John",
            lastName: "Bobo",
            email: "jay@gmail.com",
            phoneNumber: "081234567889",
            dob: "2022-07-01",
            password: "jeda123456",
            confirmPassword: "jeda123456",
        });
        expect(res.status).toEqual(400);
    });
    test("should register a user", async () => {
        const register = await request(app).post("/register").send({
            firstName: "John",
            lastName: "Bobo",
            email: "user@example.com",
            password: "abcdef123",
            confirmPassword: "abcdef123",
            phoneNumber: "081234567889",
            dob: "2022-07-01",
        });
        expect(register.status).toEqual(200);
    });
    test("should login a user", async () => {
        const login = await request(app).post("/login").send({
            email: "user@example.com",
            password: "abcdef123",
        });
        expect(login.status).toEqual(302);
    });
});

describe("Get requests", () => {
    test("should get status 404 for bad route", async () => {
        const routePage = await request(app).get("/home");
        expect(routePage.status).toEqual(404);
    });
    test("should return 401 if user is not logged in", async () => {
        const logout = await request(app).get("/logout");
        expect(logout.status).toEqual(401);
    });
    test("should not add authors if user is not logged in", async () => {
        const addAuthor = await request(app).get("/authors-form");
        expect(addAuthor.status).toEqual(401);
    });
    test("should not add books if not logged in", async () => {
        const addBook = await request(app).get("/add-books");
        expect(addBook.status).toEqual(401);
    })
});