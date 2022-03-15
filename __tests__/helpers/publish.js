let publisher = require("@pact-foundation/pact-node")
let path = require("path")

let opts = {
    pactFilesOrDirs: [path.resolve(process.cwd(), "__tests__/contract/pacts")],
    //pactBroker: "http://localhost:8080",
    //pactBroker: "http://localhost:9292",
    pactBroker:'https://perfect-id.pactflow.io',
    pactBrokerToken:'XXyoKA9lN8CXtfJIaq8lLA',
    //pactBrokerUsername:'abhishek@perfect-id.com',
    //pactBrokerPassword:'Germany@2022',
    consumerVersion: "1.0.2",
    providerVersion: "1.0.2",
    //publishVerificationResult: true,
    tags: "dev"
}

publisher.publishPacts(opts)