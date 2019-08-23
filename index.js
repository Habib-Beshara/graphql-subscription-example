const express = require('express')
const bodyParser = require('body-parser')
const { graphiqlExpress } = require('apollo-server-express')
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
// import { PubSub } from 'graphql-subscriptions'
const { SubscriptionServer } = require('subscriptions-transport-ws')
const apollo  = require('./schema')

const PORT = 3000
const WS_PORT = 3001
const app = express()

apollo.applyMiddleware({
  app
})

const server = createServer(app)
apollo.installSubscriptionHandlers(server)
server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})