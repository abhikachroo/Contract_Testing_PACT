const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const Repository = require("./repository")

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
server.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8")
  next()
})

const clientRepository = new Repository()

// Load client data into a repository object
const importData = () => {
  const data = require("./data/clientData.json")
  data.reduce((a, v) => {
    v.id = a + 1
    clientRepository.add(v)
    return a + 1
  }, 0)
}

// Get all users
server.get("/users", (req, res) => {
  res.json(clientRepository.fetchAll())
})



// Add a new User
server.post("/users", (req, res) => {
  const user = req.body

  // Basic validation for missing email field
  if (!user || !user.email) {
    res.status(400)
    res.send({message:'Missing Email!', body: req.body})        
    res.end()    
    return
  }
  else if (!user || !user.password) {
    res.status(400)
    res.send({message:'Missing password!', body: req.body})        
    res.end()    
    return
  }
  user.id = clientRepository.fetchAll().length
  clientRepository.add(user)

  res.json(user)
})

module.exports = {
  server,
  importData,
  clientRepository,
}