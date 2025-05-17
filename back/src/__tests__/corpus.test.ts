import { Prisma, PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";
import {
    StatusCodes,
} from 'http-status-codes';
import { response } from "express";

const prisma = new PrismaClient();
describe("CRUD operations for corpus",()=>{
    afterEach(async ()=>{
        await prisma.corpus.deleteMany()
        
    })
    describe("POST corpus", ()=>{
        it(`should return status 201 and the corpus created by the user when 
            description and title are provided by the user `, async ()=>{
            const response = await request(app).post("/corpus").send({
                description : "This is my first corpus",
                title : "First corpus"
            })

            expect(response.status).toBe(StatusCodes.CREATED)
            expect(response.body.corpus.description).toBe("This is my first corpus")
            expect(response.body.corpus.title).toBe("First corpus")
        })

        it(`should return status 201 and the corpus created by the user when 
            only the title is provided by the user`, async ()=>{
            const response = await request(app).post("/corpus").send({
                title : "First corpus"
            })

            expect(response.status).toBe(StatusCodes.CREATED)
            expect(response.body.corpus.title).toBe("First corpus")
        })

        it(`should return status 400 when title is not provided by the user`, async ()=>{
            const response = await request(app).post("/corpus").send({
                description : "This is my first corpus"

            })
            expect(response.status).toBe(StatusCodes.BAD_REQUEST)
        })
    })
    describe("GET corpus (id)", ()=>{
        it(`should return 200 and get all corpuses`, async ()=>{
            await request(app).post("/corpus").send({
                description : "This is my first corpus",
                title : "First corpus"
            })
            await request(app).post("/corpus").send({
                description : "This is my second corpus",
                title : "Second corpus"
            })
            
            const response = await request(app).get("/corpus")

            expect(response.status).toBe(StatusCodes.OK)
            expect(response.body.length).toBe(2)
        })

        it(`should return 200 and get a corpus by id`, async ()=>{
            const firstRequest = await request(app).post("/corpus").send({
                description : "This is my first corpus",
                title : "First corpus"
            })
            const secondRequest = await request(app).post("/corpus").send({
                description : "This is my second corpus",
                title : "Second corpus"
            })
            const firstResponse = await request(app).get(`/corpus/${firstRequest.body.corpus.id}`)
            expect(firstResponse.body.description).toBe("This is my first corpus")
            expect(firstResponse.body.title).toBe("First corpus")
            
            const secondResponse = await request(app).get(`/corpus/${secondRequest.body.corpus.id}`)
            expect(secondResponse.body.description).toBe("This is my second corpus")
            expect(secondResponse.body.title).toBe("Second corpus")
            expect(response.status).toBe(StatusCodes.OK)
        })
    })
    describe("PUT corpus", ()=>{})
    describe("DELETE corpus", ()=>{})
    
})