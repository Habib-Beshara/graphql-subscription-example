const {ApolloServer, gql} = require('apollo-server-express')
const {Resolver, schemaComposer} = require('graphql-compose')
const {PubSub} = require('graphql-subscriptions')

const pubsub = new PubSub()

// Queries
const someQueryResolver = new Resolver({
  name: 'someQuery',
  type: 'String!',
  resolve: async ({source, args, context, info}) => {
    return 'this is a test query'
  },
}, schemaComposer)

schemaComposer.Query.addFields({'someQuery': someQueryResolver})

// Mutations
const someMutationResolver = new Resolver({
  name: 'someMutation',
  type: 'String!',
  resolve: async ({source, args, context, info}) => {
    return 'this is a test mutation'
  },
}, schemaComposer)

const testSubResolver = new Resolver({
  name: 'testSub',
  type: 'String!',
  resolve: async ({source, args, context, info}) => {
    pubsub.publish('SOMETHING_CHANGED', 'sub test works!')
    return 'this Works!'
  },
}, schemaComposer)

schemaComposer.Mutation.addFields({'someMutation': someMutationResolver})
schemaComposer.Mutation.addFields({'testSub': testSubResolver})

// Subscriptions
const someSubscriptionResolver = new Resolver({
  name: 'someSubscription',
  type: 'String!',
  subscribe: ({source, args, context, info}) => {
    return pubsub.asyncIterator('SOMETHING_CHANGED')
  },
  resolve: async ({source, args, context, info}) => {
    return 'this is a test subscription'
  },
}, schemaComposer)

schemaComposer.Subscription.addFields({
  someSubscription: {
    type: 'String!',
    subscribe: () => {
      return pubsub.asyncIterator('SOMETHING_CHANGED')
    },
    resolve: async ({source, args, context, info}) => {
      return 'this is a test subscription'
    },
  },
})
