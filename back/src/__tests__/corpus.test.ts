import { Prisma, PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../app";
import {
    StatusCodes,
} from 'http-status-codes';

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
    describe("GET corpus", ()=>{})
    describe("PUT corpus", ()=>{})
    describe("DELETE corpus", ()=>{})
    
})