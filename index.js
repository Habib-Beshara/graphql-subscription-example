const express = require('express')
const bodyParser = require('body-parser')
const { graphiqlExpress } = require('apollo-server-express')
const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
// import { PubSub } from 'graphql-subscriptions'
const { SubscriptionServer } = require('subscriptions-transport-ws')
const schema  = require('./schema')

const PORT = 3000
const app = express()

schema.applyMiddleware({
  app
})

const server = createServer(app)

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
  new SubscriptionServer({
    execute,
    subscribe,
    schema: schema,
  }, {
    server: server,
    path: '/subscriptions',
  })
})