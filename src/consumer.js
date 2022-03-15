const axios = require('axios')
const express = require("express")
const server = express()
const getApiEndpoint = "http://localhost:8082"

const getUsers = async () => {
  const res = await axios
    .get(`${getApiEndpoint}/users`)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err.res
    })
  return res
}


const createUser = async (body) => {
      const res = await axios
      .post(`${getApiEndpoint}/users`, body, {'Content-Type': 'application/json;charset=utf-8'})
      .then((res) => {
          return res
        })
        .catch((err) => {
          return err.res
        })
    return res
}


module.exports = {
  server,
  getUsers,
  createUser, 
};