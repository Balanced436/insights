import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";
import {
    ReasonPhrases,
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
                'nickname': 'user'}
            )

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
                'nickname': 'user'}
            )

            expect(response.status).toBe(StatusCodes.BAD_REQUEST)
            expect(response.body.details).toBe("this email is not available")
            expect(response.body).toBeDefined()
        })


    })
})