"use strict"

const { Matchers } = require("@pact-foundation/pact")
const { getUsers,createUser } = require("../../../src/consumer")


describe("User Service", () => {
    const GET_EXPECTED_BODY = [
        {
            "email": "a@b.com",
            "password": "testpass",        
            "id": 1
        }
        ]

    afterEach(() => provider.verify())

    describe("GET users", () => {
        beforeEach(() => {
            const interaction = {
                state: "i have a list of users",
                uponReceiving: "a request for all users",
                withRequest: {
                    method: "GET",
                    path: "/users",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: GET_EXPECTED_BODY,
                },
            }
            return provider.addInteraction(interaction)
        })

        test("returns correct body, header and statusCode", async() => {            
            const response = await getUsers()
            expect(response.headers['content-type']).toBe("application/json; charset=utf-8")
            expect(response.data).toEqual(GET_EXPECTED_BODY)
            expect(response.status).toEqual(200)
        })
    })
    

    const POST_BODY = {
        email: "b@c.com", // provider verification - provider expects email in body
        password: "testpass"        

    }

    const POST_EXPECTED_BODY = {
        email: POST_BODY.email,
        password: POST_BODY.password,   
        //age: 25,    //Consumer expects additional attribute
        id: 1
    }

    describe("POST User", () => {
        beforeEach(() => {
            const interaction = {
                state: "i create a new user",
                uponReceiving: "a request to create client with email and password",
                withRequest: {
                    method: "POST",
                    path: "/users",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: POST_BODY,
                },
                willRespondWith: {
                    status: 200,
                    body: Matchers.like(POST_EXPECTED_BODY).contents,
                },
            }

            return provider.addInteraction(interaction)
        })

        test("returns correct body, header and statusCode", async() => {
            const response = await createUser(POST_BODY)
            await console.log(response.data)
            expect(response.data.id).toEqual(1)
            expect(response.status).toEqual(200)
        })
    })
})