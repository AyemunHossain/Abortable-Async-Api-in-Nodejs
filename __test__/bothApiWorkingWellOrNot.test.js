const request = require('supertest');
const baseUrl = "http://localhost:3000";


describe("BASE",()=>{
    describe("Check server status",()=>{
        it("Should get response from server",async()=>{
            const res = await request(baseUrl).get('/');
            expect(res.statusCode).toEqual(200);
        });
    })

    describe("check if execute-query works",()=>{
        it("Should get response from execute-query",async()=>{
            const res = await request(baseUrl).get('/execute-query');
            expect(res.statusCode).toEqual(400);
        });
    })

    describe("check if execute-query2 works",()=>{
        it("Should get response from execute-query",async()=>{
            const res = await request(baseUrl).get('/execute-query2');
            expect(res.statusCode).toEqual(400);
        });
    })
})