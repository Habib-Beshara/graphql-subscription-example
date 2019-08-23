const {PubSub} = require('graphql-subscriptions')

const pubsub = new PubSub()
const resolvers = {
  Subscription: {
    someSub: {
      subscribe: () => {
        return pubsub.asyncIterator('SOMETHING_CHANGED')
      },
      resolve: () => 'This is the result of SOMETHING_CHANGED'
    },
  },
  Query: {
    someQuery: () => 'query test',
  },
  Mutation: {
    someMutation: () => 'mutation test',
    testSub: () => {
      pubsub.publish('SOMETHING_CHANGED', 'sub test')
      return 'this work!'
    },
  },
}

module.exports = resolvers