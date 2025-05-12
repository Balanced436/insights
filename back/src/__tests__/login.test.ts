import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";
import {
    StatusCodes,
} from 'http-status-codes';

const prisma = new PrismaClient();
describe("CRUD operations for User", () => {

    afterAll(async () => {
        await prisma.$disconnect();
        // order of deletion matters
        await prisma.task.deleteMany()
        await prisma.transcription.deleteMany();
        await prisma.source.deleteMany();
        await prisma.user.deleteMany();
    });


    describe("POST user", () => {

        it(`it should create a user when all the information is supplied,
             after which it should returns to the user the information he enters: i.e.
            - email 
            - name
            - nickname`, async () => {
            const response = await request(app).post('/user/').send({
                'email': 'useruser@insights.fr',
                'password': 'azerty',
                'name': 'user',
                'nickname': 'user'
            })

            expect(response.status).toBe(StatusCodes.CREATED)
            expect(response.body).toBeDefined()
            expect(response.body.email).toBe("useruser@insights.fr")
            expect(response.body.name).toBe("user")
            expect(response.body.nickname).toBe("user")


        })

        it(`it should fail and return 400 when email, password, name or nickname is missing`, async () => {
            const response = await request(app).post('/user/').send({
                'email': 'useruser@insights.fr',
                'password': 'azerty',
                'name': 'user',
                'nickname': 'user'
            })

            expect(response.status).toBe(StatusCodes.BAD_REQUEST)
            expect(response.body.details).toBe("this email is not available")
            expect(response.body).toBeDefined()
        })


    })

    describe("GET user (id)", () => {
        it(`It should be able to get all user`, async () => {
            const response = await request(app).get('/user/')
            expect(response.status).toBe(StatusCodes.OK)
            expect(response.body.users).toBeDefined()
        })

        it(`It should be able to get a user by id`, async () => {
            // add a new user
            const newUser = await request(app).post('/user/').send({
                'email': 'useruser@insights.fr',
                'password': 'azerty',
                'name': 'user',
                'nickname': 'user'
            })

            const response = await request(app).get(`/user/${newUser.body.id}`)
            expect(response.status).toBe(StatusCodes.OK)
            expect(response.body.id).toBe(newUser.body.id)
            expect(response.body.email).toBe(newUser.body.email)
            expect(response.body.name).toBe(newUser.body.name)
            expect(response.body.nickname).toBe(newUser.body.nickname)
        })
    })

        describe("DELETE user (id)", () => {
        it(`It should be able delete a user`, async () => {
            const newUser = await request(app).post('/user/').send({
                'email': 'useruser@insights.fr',
                'password': 'azerty',
                'name': 'user',
                'nickname': 'user'
            })
            const response = await request(app).delete(`/user/${newUser.body.id}`)
            expect(response.status).toBe(StatusCodes.CREATED)
            expect(response.body.id).toBe(newUser.body.id)
            expect(response.body.email).toBe(newUser.body.email)
            expect(response.body.name).toBe(newUser.body.name)
            expect(response.body.nickname).toBe(newUser.body.nickname)
        })
    })

        describe("PUT user (id)", () => {
        it(`It should be able update a user information like the name`, async () => {
            const newUser = await request(app).put('/user/').send({
                'email': 'useruser@insights.fr',
                'password': 'azerty',
                'name': 'user',
                'nickname': 'user'
            })
            const response = await request(app).put(`/user/${newUser.body.id}`).send({
                'name': 'newname'
            })
            expect(response.status).toBe(StatusCodes.CREATED)
            expect(response.body.id).toBe(newUser.body.id)
            expect(response.body.email).toBe(newUser.body.email)
            expect(response.body.name).toBe("newname")
            expect(response.body.nickname).toBe(newUser.body.nickname)

        })

        it(`It should be able update a user information like the nickname`, async () => {
            const newUser = await request(app).put('/user/').send({
                'email': 'useruser@insights.fr',
                'password': 'azerty',
                'name': 'user',
                'nickname': 'user'
            })
            const response = await request(app).put(`/user/${newUser.body.id}`).send({
                'name': 'newnickname'
            })
            expect(response.status).toBe(StatusCodes.CREATED)
            expect(response.body.id).toBe(newUser.body.id)
            expect(response.body.email).toBe(newUser.body.email)
            expect(response.body.name).toBe(newUser.body.name)
            expect(response.body.nickname).toBe("newnickname")

        })
    })
})