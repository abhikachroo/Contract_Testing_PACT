const path = require("path")
const { Verifier } = require("@pact-foundation/pact")
const { server, importData } = require("../../../src/provider")

const SERVER_URL = "http://localhost:8081"

server.listen(8081, () => {
    importData()
    console.log(`Users Service listening on ${SERVER_URL}`)
  })
  
  describe("Users Service Verification", () => {jest.setTimeout(30000);
    it("validates the expectations of User Service", () => {
      let opts = {
            provider: "BackendAPI",
            logLevel: "DEBUG",
            providerBaseUrl: SERVER_URL,
            //pactUrls: [path.resolve(process.cwd(),"./__tests__/contract/pacts/ios-backendapi.json")],
            //pactUrls: ['http://localhost:9292/pacts/provider/BackendAPI/consumer/iOS/latest'],
            pactUrls:['https://perfect-id.pactflow.io/pacts/provider/BackendAPI/consumer/iOS/latest'],
            pactBrokerToken:'XXyoKA9lN8CXtfJIaq8lLA',
            consumerVersionTags: ["dev"],
            providerVersionTags: ["dev"],
            publishVerificationResult: true,
            providerVersion: "1.0.2"
          }
        return new Verifier(opts).verifyProvider().then(output => {
            console.log("Pact Verification Complete!")
            console.log(output)
        })
    })
})