const express = require('express')
const bodyParser = require('body-parser')
const {createServer} = require('http')
const {execute, subscribe} = require('graphql')
// import { PubSub } from 'graphql-subscriptions'
const graphqlHTTP = require('express-graphql')
const {SubscriptionServer} = require('subscriptions-transport-ws')
const expressPlayground = require('graphql-playground-middleware-express')
  .default
const {schemaComposer} = require('graphql-compose')
require('./schema')

const PORT = 3000
const app = express()
// ===========================


const subscriptionsEndpoint = `ws://localhost:${PORT}/subscriptions`
const schema = schemaComposer.buildSchema()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  subscriptionsEndpoint: subscriptionsEndpoint,
}))
app.get('/playground', expressPlayground({endpoint: '/graphql', subscriptionEndpoint: subscriptionsEndpoint}))
// Create listener server by wrapping express app
const webServer = createServer(app)

webServer.listen(PORT, () => {
  console.log(`GraphQL is now running on http://localhost:${PORT}`)

  // Set up the WebSocket for handling GraphQL subscriptions.
  new SubscriptionServer({
    execute,
    subscribe,
    schema,
  }, {
    server: webServer,
    path: '/subscriptions',
  })

})