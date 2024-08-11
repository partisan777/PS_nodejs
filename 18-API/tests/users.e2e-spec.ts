import { App } from "../src/app";
import { boot } from "../src/main";
import request from "supertest";

let application: App;


beforeAll(async () => {
    const { app } = await boot;
    application = app
});

describe('User create', () =>{
    it('Register - error', async () => {
        const res = await request(application.app)
        .post('/users/register')
        .send({"email": "2@2.com", "login": "login2", "password": "password2"});
    expect(res.statusCode).toBe(200);

    })
});

describe('Login success', () =>{
    it('Register - error', async () => {
        const res = await request(application.app)
        .post('/users/login')
        .send({"email": "2@2.com", "login": "login2", "password": "password2"});
    expect(res.body.jwt).not.toBeUndefined();

    })
});

afterAll(() => {
    application.close();
});
