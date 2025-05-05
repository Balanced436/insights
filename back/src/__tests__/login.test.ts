import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";

const prisma = new PrismaClient();
describe("CRUD operations for User", () => {

    afterAll(async () => {
        await prisma.$disconnect();
        // order of deletion matters
        await prisma.task.deleteMany()
        await prisma.transcription.deleteMany();
        await prisma.source.deleteMany();
    });


    describe("POST user", () => {

        it(`it should create a user when all informations are provided`, async () => {
            const response = await request(app).post('/user/').send({
                'email': 'useruser@insights.fr',
                'password': 'azerty',
                'name': 'user',
                'nickname': 'user'}
            )

            expect(response.status).toBe(201)
            expect(response.body).toBeDefined()


        })

        it(`it should fail and return 400 when email, password, name or nickname is missing`, async () => {
            const response = await request(app).post('/user/').send({
                'email': 'useruser@insights.fr',
                'password': 'azerty',
                'name': 'user',
                'nickname': 'user'}
            )

            expect(response.status).toBe(201)
            expect(response.body).toBeDefined()

            expect(true).toBe(false)

        })


    })

})